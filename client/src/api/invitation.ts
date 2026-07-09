import { api } from './client'
import type { WeddingInvitation, RSVPFormData, InvitationListItem, InvitationListParams, ApiListResponse } from '@/types'

export const mockInvitation: WeddingInvitation = {
  id: 'demo',
  couple: {
    groom: 'Կարեն',
    bride: 'Գայանե',
    groomEn: 'KAREN',
    brideEn: 'GAYANE',
  },
  hero: {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
    subtitle: 'Սիրով հրավիրում ենք Ձեզ կիսելու մեր ուրախության օրը',
  },
  story: {
    title: 'Մեր Սիրո Պատմությունը',
    content:
      'Մեր ճանապարհը սկսվեց մի սովորական օր, որը դարձավ անմոռանալի։',
  },
  weddingDate: '2026-08-17T15:00:00',
  calendar: {
    monthName: 'Օգոստոս',
    year: 2026,
  },
  locations: [],
  timeline: { title: '', events: [] },
  dressCode: { title: '', description: '', images: [], colorPalette: [], guidelines: [] },
  rsvp: { title: '', subtitle: '' },
  final: { title: '', message: '', image: '' },
}

function mapToListItem(inv: WeddingInvitation): InvitationListItem {
  const coupleTitle = inv.couple
    ? `${inv.couple.groom} & ${inv.couple.bride}`
    : 'Wedding Invitation'

  return {
    id: inv.id ?? '',
    title: inv.title || coupleTitle,
    date: inv.weddingDate,
    coverImage: inv.hero?.image ?? '',
    slug: inv.slug,
  }
}
export const invitationService = {
  async getAll(params: InvitationListParams = {}): Promise<InvitationListItem[]> {
    const response = await api.get<ApiListResponse<WeddingInvitation>>('/invitations', {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        search: params.search || undefined,
        public: params.public !== false ? 'true' : 'false',
      },
    })
    return response.data.data.map(mapToListItem)
  },

  async getById(id: string): Promise<WeddingInvitation> {
    const response = await api.get<{ status: string; data: WeddingInvitation }>(`/invitations/${id}`)
    return response.data.data
  },

  async getBySlug(slug: string): Promise<WeddingInvitation> {
    const response = await api.get<{ status: string; data: WeddingInvitation }>(`/invitations/slug/${slug}`)
    return response.data.data
  },

  async create(data: Omit<WeddingInvitation, 'id'>): Promise<WeddingInvitation> {
    const response = await api.post<{ status: string; data: WeddingInvitation }>('/invitations', data)
    return response.data.data
  },

  async update(id: string, data: Partial<WeddingInvitation>): Promise<WeddingInvitation> {
    const response = await api.put<{ status: string; data: WeddingInvitation }>(`/invitations/${id}`, data)
    return response.data.data
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/invitations/${id}`)
  },

  async submitRSVP(invitationId: string, data: RSVPFormData): Promise<void> {
    await api.post('/rsvp', {
      invitationId,
      fullName: data.name,
      email: data.email,
      phone: data.phone,
      attendance: data.attendance,
      guests: data.guests ?? 0,
      dietaryRestrictions: data.dietaryRestrictions,
      message: data.message,
    })
  },
}
