import { asyncHandler } from "../middleware/asyncHandler.js";
import { prisma } from "../db/prisma.js";
import { AppError } from "../utils/appError.js";

export const createChatRoom = asyncHandler(async (req, res, next) => {
  const { type, invitationId, name, description } = req.body;

  if (!type || !name) {
    return next(new AppError("Type and name are required", 400));
  }

  const chatRoom = await prisma.chatRoom.create({
    data: {
      type,
      invitationId,
      name,
      description,
      participants: {
        create: [{ userId: req.user.id, role: "creator" }],
      },
    },
    include: {
      participants: true,
      messages: true,
    },
  });

  res.status(201).json({ status: "success", data: chatRoom });
});

export const getChatRoom = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const chatRoom = await prisma.chatRoom.findUnique({
    where: { id },
    include: {
      participants: {
        include: {
          user: { select: { id: true, email: true } },
        },
      },
      messages: {
        include: {
          sender: { select: { id: true, email: true } },
        },
        orderBy: { createdAt: "asc" },
      },
      invitation: true,
    },
  });

  if (!chatRoom) {
    return next(new AppError("Chat room not found", 404));
  }

  // Check if user has access
  const hasAccess = chatRoom.participants.some((p) => p.userId === req.user.id) || req.user.role === "ADMIN";
  if (!hasAccess) {
    return next(new AppError("You do not have access to this chat room", 403));
  }

  res.json({ status: "success", data: chatRoom });
});

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { chatRoomId } = req.params;
  const { content } = req.body;

  if (!content?.trim()) {
    return next(new AppError("Message content is required", 400));
  }

  // Verify user is participant
  const participant = await prisma.chatRoomParticipant.findUnique({
    where: { chatRoomId_userId: { chatRoomId, userId: req.user.id } },
  });

  if (!participant && req.user.role !== "ADMIN") {
    return next(new AppError("You are not a participant in this chat room", 403));
  }

  const message = await prisma.message.create({
    data: {
      chatRoomId,
      senderId: req.user.id,
      content: content.trim(),
    },
    include: {
      sender: { select: { id: true, email: true } },
    },
  });

  res.status(201).json({ status: "success", data: message });
});

export const getChatRooms = asyncHandler(async (req, res) => {
  const chatRooms = await prisma.chatRoom.findMany({
    where: {
      participants: {
        some: {
          userId: req.user.id,
        },
      },
    },
    include: {
      participants: true,
      messages: {
        take: 1,
        orderBy: { createdAt: "desc" },
        include: {
          sender: { select: { id: true, email: true } },
        },
      },
      invitation: {
        select: { id: true, title: true, couple: true },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  res.json({ status: "success", data: chatRooms });
});

export const addParticipant = asyncHandler(async (req, res, next) => {
  const { chatRoomId, userId } = req.body;

  // Only admin or creator can add participants
  const room = await prisma.chatRoom.findUnique({
    where: { id: chatRoomId },
    include: { participants: true },
  });

  if (!room) {
    return next(new AppError("Chat room not found", 404));
  }

  const isCreator = room.participants.some((p) => p.userId === req.user.id && p.role === "creator");
  if (!isCreator && req.user.role !== "ADMIN") {
    return next(new AppError("Only creators or admins can add participants", 403));
  }

  const participant = await prisma.chatRoomParticipant.create({
    data: {
      chatRoomId,
      userId,
    },
  });

  res.status(201).json({ status: "success", data: participant });
});
