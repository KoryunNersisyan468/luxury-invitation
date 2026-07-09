import { asyncHandler } from "../middleware/asyncHandler.js";
import {
  getInvitationList,
  getInvitation,
  createInvitation,
  updateInvitation,
  deleteInvitation,
  approveInvitation,
  rejectInvitation,
} from "../services/invitationService.js";
import { AppError } from "../utils/appError.js";

export const listInvitations = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const search = req.query.search?.toString();
  const isPublic = req.query.public ? req.query.public === "true" : true;

  const result = await getInvitationList({ page, limit, search, isPublic });
  res.json({ status: "success", meta: result.meta, data: result.data });
});

export const getInvitationById = asyncHandler(async (req, res, next) => {
  const identifier = req.params.id || req.params.slug;
  const invitation = await getInvitation(identifier, true);
  if (!invitation) {
    return next(new AppError("Invitation not found", 404));
  }
  res.json({ status: "success", data: invitation });
});

export const createInvitationHandler = asyncHandler(async (req, res) => {
  const invitation = await createInvitation(req.body, req.user?.id);
  res.status(201).json({ status: "success", data: invitation });
});

export const updateInvitationHandler = asyncHandler(async (req, res, next) => {
  const id = req.params.id || req.params.slug;
  const updated = await updateInvitation(id, req.body);
  if (!updated) {
    return next(new AppError("Invitation not found", 404));
  }
  res.json({ status: "success", data: updated });
});

export const deleteInvitationHandler = asyncHandler(async (req, res, next) => {
  const invitation = await deleteInvitation(req.params.id);
  if (!invitation) {
    return next(new AppError("Invitation not found", 404));
  }
  res.status(204).send();
});

export const approveInvitationHandler = asyncHandler(async (req, res) => {
  const invitation = await approveInvitation(req.params.id);
  res.json({ status: "success", data: invitation });
});

export const rejectInvitationHandler = asyncHandler(async (req, res) => {
  const invitation = await rejectInvitation(req.params.id);
  res.json({ status: "success", data: invitation });
});
