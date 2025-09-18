import { Router } from "express";
import { registerUser,
    loginUser,
    getCurrentUser
 } from "../controllers/user.controller.js";

 import { verifyJWT } from "../middlewares/auth.middleware.js"; 

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyJWT, getCurrentUser);

export  default router;