import multer from 'multer';
import path from 'path';
import fs from 'fs';
import MedicalFile from '../models/medicalFile.model.js';

// Simple file storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/medical-files/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${req.user.id}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images, PDFs, and documents are allowed.'));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, //limited to 10MB
  fileFilter: fileFilter
});

// Upload medical file function-
export const uploadMedicalFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { description, category } = req.body;

    const medicalFile = new MedicalFile({
      userId: req.user.id,
      filename: req.file.filename,
      originalName: req.file.originalname,
      filePath: req.file.path,
      category: category || 'general',
      description: description || '',
      fileSize: req.file.size,
      mimeType: req.file.mimetype
    });

    await medicalFile.save();

    res.status(201).json({
      message: 'Medical file uploaded successfully',
      file: {
        id: medicalFile._id,
        filename: medicalFile.originalName,
        category: medicalFile.category,
        uploadDate: medicalFile.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all user's medical files here -
export const getMedicalFiles = async (req, res) => {
  try {
    const files = await MedicalFile.find({ userId: req.user.id })
      .select('-filePath')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Medical files retrieved successfully',
      files: files
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete medical file
export const deleteMedicalFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    
    const file = await MedicalFile.findOne({
      _id: fileId,
      userId: req.user.id
    });

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete physical file-
    if (fs.existsSync(file.filePath)) {
      fs.unlinkSync(file.filePath);
    }

    // Delete database record
    await MedicalFile.deleteOne({ _id: fileId });

    res.json({ message: 'Medical file deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};