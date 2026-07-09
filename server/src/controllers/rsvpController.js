import { asyncHandler } from "../middleware/asyncHandler.js";
import { submitRsvp, fetchRsvpsByInvitation } from "../services/rsvpService.js";
import { AppError } from "../utils/appError.js";

export const submitRsvpHandler = asyncHandler(async (req, res) => {
  const rsvp = await submitRsvp(req.body);
  res.status(201).json({ status: "success", data: rsvp });
});

export const getRsvpsByInvitation = asyncHandler(async (req, res, next) => {
  const invitationId = req.params.invitationId;
  const responses = await fetchRsvpsByInvitation(invitationId);
  if (!responses) {
    return next(new AppError("No RSVP responses found", 404));
  }
  res.json({ status: "success", data: responses });
});
