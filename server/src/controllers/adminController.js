import { asyncHandler } from "../middleware/asyncHandler.js";
import { getInvitationList } from "../services/invitationService.js";
import { prisma } from "../db/prisma.js";

export const listAdminInvitations = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 20;
  const search = req.query.search?.toString();

  const result = await getInvitationList({ page, limit, search, isPublic: undefined });
  res.json({ status: "success", meta: result.meta, data: result.data });
});

export const listUsers = asyncHandler(async (_req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json({ status: "success", data: users });
});

export const listCategories = asyncHandler(async (_req, res) => {
  const categories = await prisma.invitationCategory.findMany({
    orderBy: { name: "asc" },
  });
  res.json({ status: "success", data: categories });
});

export const upsertCategory = asyncHandler(async (req, res) => {
  const category = await prisma.invitationCategory.upsert({
    where: { slug: req.body.slug },
    update: req.body,
    create: req.body,
  });
  res.status(201).json({ status: "success", data: category });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await prisma.invitationCategory.delete({ where: { id: req.params.id } });
  res.status(204).send();
});

export const listTemplates = asyncHandler(async (_req, res) => {
  const templates = await prisma.invitationTemplate.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });
  res.json({ status: "success", data: templates });
});

export const upsertTemplate = asyncHandler(async (req, res) => {
  const data = {
    category: req.body.category,
    style: req.body.style,
    name: req.body.name,
    previewUrl: req.body.previewUrl,
    config: req.body.config,
    isActive: req.body.isActive ?? true,
  };

  const template = req.body.id
    ? await prisma.invitationTemplate.update({ where: { id: req.body.id }, data })
    : await prisma.invitationTemplate.create({ data });

  res.status(201).json({ status: "success", data: template });
});

export const deleteTemplate = asyncHandler(async (req, res) => {
  await prisma.invitationTemplate.delete({ where: { id: req.params.id } });
  res.status(204).send();
});
