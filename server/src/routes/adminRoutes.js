import { Router } from "express";
import {
  deleteCategory,
  deleteTemplate,
  listAdminInvitations,
  listCategories,
  listTemplates,
  listUsers,
  upsertCategory,
  upsertTemplate,
} from "../controllers/adminController.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/invitations", protect, requireAdmin, listAdminInvitations);
router.get("/users", protect, requireAdmin, listUsers);
router.get("/categories", protect, requireAdmin, listCategories);
router.post("/categories", protect, requireAdmin, upsertCategory);
router.delete("/categories/:id", protect, requireAdmin, deleteCategory);
router.get("/templates", protect, requireAdmin, listTemplates);
router.post("/templates", protect, requireAdmin, upsertTemplate);
router.delete("/templates/:id", protect, requireAdmin, deleteTemplate);

export default router;
