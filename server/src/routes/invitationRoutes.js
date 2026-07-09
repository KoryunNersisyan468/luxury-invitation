import { Router } from "express";
import {
  listInvitations,
  getInvitationById,
  createInvitationHandler,
  updateInvitationHandler,
  deleteInvitationHandler,
  approveInvitationHandler,
  rejectInvitationHandler,
} from "../controllers/invitationController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { invitationSchema } from "../validators/invitationValidator.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", listInvitations);
router.get("/slug/:slug", getInvitationById);
router.get("/:id", getInvitationById);
// Require authentication to create invitations
router.post("/", protect, validateRequest(invitationSchema), createInvitationHandler);
router.patch("/:id/approve", protect, requireAdmin, approveInvitationHandler);
router.patch("/:id/reject", protect, requireAdmin, rejectInvitationHandler);
router.put("/:id", protect, requireAdmin, validateRequest(invitationSchema), updateInvitationHandler);
router.delete("/:id", protect, requireAdmin, deleteInvitationHandler);

export default router;
