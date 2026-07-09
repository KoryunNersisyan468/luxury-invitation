import { Router } from "express";
import { getGallery, getLocations, getTimeline } from "../controllers/contentController.js";

const router = Router();

router.get("/gallery/:invitationId", getGallery);
router.get("/locations/:invitationId", getLocations);
router.get("/timeline/:invitationId", getTimeline);

export default router;
