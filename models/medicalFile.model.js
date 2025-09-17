import mongoose from "mongoose";

const medicalFileSchema = new mongoose.Schema({
      userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['lab_report', 'prescription', 'xray', 'general', 'other'],
    default: 'general'
  },
  description: {
    type: String,
    maxlength: 500
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

//to have faster queries on userId
medicalFileSchema.index({ userId: 1, createdAt: -1 });

export default new mongoose.model("MedicalFile", medicalFileSchema);