import { Router } from "express";
import { 
  createHealthProfile,
  analyzeHealth,
  getHealthProfile,
  updateHealthProfile,
  checkSymptoms
} from "../controllers/health.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/profile", verifyJWT, createHealthProfile);
router.get("/profile", verifyJWT, getHealthProfile);
router.put("/profile", verifyJWT, updateHealthProfile);
router.post("/analyze", verifyJWT, analyzeHealth);
router.post("/symptoms", verifyJWT, checkSymptoms);

export default router;