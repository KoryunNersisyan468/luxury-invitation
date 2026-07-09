import { Router } from "express";
import { submitRsvpHandler, getRsvpsByInvitation } from "../controllers/rsvpController.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { rsvpSchema } from "../validators/rsvpValidator.js";
import { protect, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", validateRequest(rsvpSchema), submitRsvpHandler);
router.get("/:invitationId", protect, requireAdmin, getRsvpsByInvitation);

export default router;
