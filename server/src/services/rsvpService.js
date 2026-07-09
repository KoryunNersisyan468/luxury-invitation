import { prisma } from "../db/prisma.js";

export const submitRsvp = async (payload) => {
  const data = {
    invitationId: payload.invitationId,
    fullName: payload.fullName || payload.name,
    email: payload.email,
    phone: payload.phone || null,
    attendance: payload.attendance || (payload.attending ? 'yes' : 'no'),
    dietaryRestrictions: payload.dietaryRestrictions || null,
    guests: payload.guests ?? 0,
    message: payload.message,
  };

  return prisma.rsvp.create({ data });
};

export const fetchRsvpsByInvitation = async (invitationId) => {
  return prisma.rsvp.findMany({
    where: { invitationId },
    orderBy: { createdAt: "desc" },
  });
};
