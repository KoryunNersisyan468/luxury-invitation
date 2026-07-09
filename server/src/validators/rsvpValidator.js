import { z } from "zod";

export const rsvpSchema = z.object({
  invitationId: z.string().uuid({ message: "Invitation ID must be a valid UUID" }),
  fullName: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }).optional(),
  phone: z.string().optional(),
  // Accept either boolean `attending` or string `attendance` from frontend
  attending: z.boolean().optional(),
  attendance: z.enum(['yes','no','maybe']).optional(),
  guests: z.number().int().min(0).optional(),
  dietaryRestrictions: z.string().optional(),
  message: z.string().max(500).optional(),
});
