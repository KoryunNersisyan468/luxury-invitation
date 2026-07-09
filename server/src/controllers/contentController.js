import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  getGalleryByInvitationId,
  getLocationsByInvitationId,
  getTimelineByInvitationId,
} from "../services/invitationService.js";
import { AppError } from "../utils/appError.js";

export const getGallery = asyncHandler(async (req, res, next) => {
  const invitationId = req.params.invitationId;
  const gallery = await getGalleryByInvitationId(invitationId);

  if (!gallery || gallery.length === 0) {
    return next(new AppError("Gallery not found", 404));
  }

  res.json({ status: "success", data: gallery });
});

export const getLocations = asyncHandler(async (req, res, next) => {
  const invitationId = req.params.invitationId;
  const locations = await getLocationsByInvitationId(invitationId);

  if (!locations || locations.length === 0) {
    return next(new AppError("Locations not found", 404));
  }

  res.json({ status: "success", data: locations });
});

export const getTimeline = asyncHandler(async (req, res, next) => {
  const invitationId = req.params.invitationId;
  const timeline = await getTimelineByInvitationId(invitationId);

  if (!timeline || timeline.length === 0) {
    return next(new AppError("Timeline not found", 404));
  }

  res.json({ status: "success", data: timeline });
});
