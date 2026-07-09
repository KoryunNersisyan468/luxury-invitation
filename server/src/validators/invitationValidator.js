import { z } from "zod";

const coupleSchema = z.object({
  groom: z.string().min(1),
  bride: z.string().min(1),
  groomEn: z.string().optional(),
  brideEn: z.string().optional(),
});

const heroSchema = z.object({
  image: z.string().min(1),
  subtitle: z.string().optional(),
});

const storySchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

const calendarSchema = z.object({
  monthName: z.string().min(1),
  year: z.number().int().positive(),
});

const locationSchema = z.object({
  id: z.string().optional(),
  type: z.enum(["ceremony", "reception"]).optional(),
  name: z.string().min(1),
  nameEn: z.string().optional(),
  address: z.string().optional(),
  mapUrl: z.string().optional(),
  image: z.string().optional(),
  order: z.number().int().optional(),
});

const timelineEventSchema = z.object({
  id: z.string().optional(),
  time: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().optional(),
});

const dressCodeImageSchema = z.object({
  label: z.string().optional(),
  imageUrl: z.string().min(1),
  order: z.number().int().optional(),
});

const galleryImageSchema = z.object({
  imageUrl: z.string().min(1),
  caption: z.string().optional(),
  order: z.number().int().optional(),
});

export const invitationSchema = z.object({
  title: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  style: z.string().min(1, "Style is required"),
  couple: coupleSchema,
  hero: heroSchema,
  story: storySchema,
  calendar: calendarSchema,
  weddingDate: z.string().refine((value) => !Number.isNaN(Date.parse(value)), {
    message: "Invalid wedding date",
  }),
  musicUrl: z.string().url().optional(),
  final: z.object({
    title: z.string().optional(),
    message: z.string().optional(),
    image: z.string().optional(),
  }).optional(),
  status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
  isPublic: z.boolean().optional(),
  locations: z.array(locationSchema).optional(),
  timeline: z.object({ title: z.string().optional(), events: z.array(timelineEventSchema) }).optional(),
  dressCode: z.object({ title: z.string().optional(), description: z.string().optional(), images: z.array(z.string()).optional(), colorPalette: z.array(z.string()).optional(), guidelines: z.array(z.string()).optional() }).optional(),
  rsvp: z.object({ title: z.string().optional(), subtitle: z.string().optional() }).optional(),
  gallery: z.array(galleryImageSchema).optional(),
});
