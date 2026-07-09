export interface WeddingCouple {
  groom: string
  bride: string
  groomEn?: string
  brideEn?: string
}

export interface WeddingHero {
  image: string
  subtitle?: string
}

export interface WeddingStory {
  title?: string
  content?: string
}

export interface WeddingCalendar {
  monthName: string
  year: number
}

export interface WeddingLocation {
  id?: string
  type: 'ceremony' | 'reception'
  name: string
  nameEn?: string
  address?: string
  mapUrl?: string
  image?: string
  order?: number
}

export interface TimelineEvent {
  id?: string
  time: string
  title: string
  description?: string
  order?: number
}

export interface WeddingTimeline {
  title?: string
  events: TimelineEvent[]
}

export interface WeddingDressCode {
  title?: string
  description?: string
  images: string[]
  colorPalette: string[]
  guidelines: string[]
}

export interface WeddingRSVP {
  title?: string
  subtitle?: string
}

export interface WeddingFinal {
  title?: string
  message?: string
  image?: string
}

export interface GalleryImage {
  id?: string
  imageUrl: string
  caption?: string
  order?: number
}

export interface WeddingInvitation {
  id?: string
  slug?: string
  title?: string
  category?: string
  style?: string
  couple: WeddingCouple
  hero: WeddingHero
  story: WeddingStory
  weddingDate: string
  calendar: WeddingCalendar
  locations: WeddingLocation[]
  timeline: WeddingTimeline
  dressCode: WeddingDressCode
  rsvp: WeddingRSVP
  final: WeddingFinal
  gallery?: GalleryImage[]
  musicUrl?: string
  status?: 'PENDING' | 'APPROVED' | 'REJECTED'
  isPublic?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface InvitationListItem {
  id: string
  title: string
  date: string
  coverImage: string
  slug?: string
}

export interface InvitationListParams {
  page?: number
  limit?: number
  search?: string
  public?: boolean
}

export interface RSVPFormData {
  name: string
  email: string
  phone?: string
  attendance: 'yes' | 'no' | 'maybe'
  guests: number
  dietaryRestrictions?: string
  message?: string
}

export type { User, UserRole, AuthResponse, LoginCredentials, RegisterCredentials } from './auth'
export type { PaginationMeta, ApiListResponse, ApiItemResponse, UploadResult } from './api'
