import { Router } from "express";
import {
  register,
  login,
  me,
  googleAuth,
  facebookAuth,
  forgotPassword,
  resetPasswordController,
} from "../controllers/authController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/authValidator.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/google", googleAuth);
router.post("/facebook", facebookAuth);
router.post("/forgot-password", validateRequest(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validateRequest(resetPasswordSchema), resetPasswordController);
router.get("/me", protect, me);

export default router;
