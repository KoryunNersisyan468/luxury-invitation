import { z } from 'zod'

export const locationSchema = z.object({
  id: z.string(),
  type: z.enum(['ceremony', 'reception']),
  name: z.string().min(1, 'Պարտադիր դաշտ'),
  nameEn: z.string().optional().default(''),
  address: z.string().optional().default(''),
  mapUrl: z.string().optional().default(''),
  image: z.string().optional().default(''),
})

export const timelineEventSchema = z.object({
  id: z.string(),
  time: z.string().min(1, 'Պարտադիր'),
  title: z.string().min(1, 'Պարտադիր դաշտ'),
  description: z.string().optional().default(''),
})

export const invitationSchema = z.object({
  title: z.string().optional().default(''),
  category: z.string().min(1, 'Ընտրեք կատեգորիա'),
  style: z.string().min(1, 'Ընտրեք դիզայն'),
  couple: z.object({
    groom: z.string().min(1, 'Փեսայի անունը պարտադիր է'),
    bride: z.string().min(1, 'Հարսի անունը պարտադիր է'),
    groomEn: z.string().optional().default(''),
    brideEn: z.string().optional().default(''),
  }),
  hero: z.object({
    image: z.string().min(1, 'Գլխավոր նկարը պարտադիր է'),
    subtitle: z.string().optional().default(''),
  }),
  story: z.object({
    title: z.string().optional().default(''),
    content: z.string().optional().default(''),
  }),
  weddingDate: z.string().min(1, 'Ամսաթիվը պարտադիր է'),
  calendar: z.object({
    monthName: z.string().min(1, 'Պարտադիր դաշտ'),
    year: z.coerce.number().int().min(2000).max(2100),
  }),
  locations: z.array(locationSchema),
  timeline: z.object({
    title: z.string().optional().default(''),
    events: z.array(timelineEventSchema),
  }),
  dressCode: z.object({
    title: z.string().optional().default(''),
    description: z.string().optional().default(''),
    images: z.array(z.string()),
    colorPalette: z.array(z.string()),
    guidelines: z.array(z.string()),
  }),
  rsvp: z.object({
    title: z.string().optional().default(''),
    subtitle: z.string().optional().default(''),
  }),
  final: z.object({
    title: z.string().optional().default(''),
    message: z.string().optional().default(''),
    image: z.string().optional().default(''),
  }),
})

export type InvitationFormValues = z.infer<typeof invitationSchema>
