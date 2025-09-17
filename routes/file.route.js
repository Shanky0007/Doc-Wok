import { Router } from "express";
import { 
  uploadMedicalFile,
  getMedicalFiles,
  deleteMedicalFile,
  upload
} from "../controllers/file.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/upload", verifyJWT, upload.single('medicalFile'), uploadMedicalFile);
router.get("/", verifyJWT, getMedicalFiles);
router.delete("/:fileId", verifyJWT, deleteMedicalFile);

export default router;