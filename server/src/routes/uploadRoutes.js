import { Router } from "express";
import { deleteImage, listImages, uploadImage, uploadMiddleware } from "../controllers/uploadController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Require authentication for all upload operations
router.post("/", protect, uploadMiddleware, uploadImage);
router.get("/", protect, requireAdmin, listImages);
router.delete("/:id", protect, requireAdmin, deleteImage);

export default router;
