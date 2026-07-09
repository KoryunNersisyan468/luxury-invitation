import { api } from './client'
import type { ApiListResponse } from '@/types/api'
import type { UploadResult } from '@/types/api'
import type { User, WeddingInvitation } from '@/types'

export interface RsvpRecord {
  id: string
  invitationId: string
  fullName: string
  email: string
  phone?: string
  attendance: string
  dietaryRestrictions?: string
  guests: number
  message?: string
  createdAt: string
  updatedAt: string
}

export interface InvitationListParams {
  page?: number
  limit?: number
  search?: string
  public?: boolean
}

export interface InvitationCategoryRecord {
  id?: string
  slug: string
  name: string
  description?: string
  fields?: unknown
  isActive?: boolean
}

export interface InvitationTemplateRecord {
  id?: string
  category: string
  style: string
  name: string
  previewUrl?: string
  config?: unknown
  isActive?: boolean
}

export const adminService = {
  async getInvitations(params: InvitationListParams = {}): Promise<ApiListResponse<WeddingInvitation>> {
    const { data } = await api.get<ApiListResponse<WeddingInvitation>>('/admin/invitations', {
      params: {
        page: params.page ?? 1,
        limit: params.limit ?? 20,
        search: params.search || undefined,
      },
    })
    return data
  },

  async getRsvps(invitationId: string): Promise<RsvpRecord[]> {
    const { data } = await api.get<{ status: string; data: RsvpRecord[] }>(`/rsvp/${invitationId}`)
    return data.data
  },

  async deleteInvitation(id: string): Promise<void> {
    await api.delete(`/invitations/${id}`)
  },

  async approveInvitation(id: string): Promise<WeddingInvitation> {
    const { data } = await api.patch<{ status: string; data: WeddingInvitation }>(`/invitations/${id}/approve`)
    return data.data
  },

  async rejectInvitation(id: string): Promise<WeddingInvitation> {
    const { data } = await api.patch<{ status: string; data: WeddingInvitation }>(`/invitations/${id}/reject`)
    return data.data
  },

  async updateInvitation(id: string, payload: Partial<WeddingInvitation>): Promise<WeddingInvitation> {
    const { data } = await api.put<{ status: string; data: WeddingInvitation }>(`/invitations/${id}`, payload)
    return data.data
  },

  async getUsers(): Promise<User[]> {
    const { data } = await api.get<{ status: string; data: User[] }>('/admin/users')
    return data.data
  },

  async getCategories(): Promise<InvitationCategoryRecord[]> {
    const { data } = await api.get<{ status: string; data: InvitationCategoryRecord[] }>('/admin/categories')
    return data.data
  },

  async saveCategory(payload: InvitationCategoryRecord): Promise<InvitationCategoryRecord> {
    const { data } = await api.post<{ status: string; data: InvitationCategoryRecord }>('/admin/categories', payload)
    return data.data
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/admin/categories/${id}`)
  },

  async getTemplates(): Promise<InvitationTemplateRecord[]> {
    const { data } = await api.get<{ status: string; data: InvitationTemplateRecord[] }>('/admin/templates')
    return data.data
  },

  async saveTemplate(payload: InvitationTemplateRecord): Promise<InvitationTemplateRecord> {
    const { data } = await api.post<{ status: string; data: InvitationTemplateRecord }>('/admin/templates', payload)
    return data.data
  },

  async deleteTemplate(id: string): Promise<void> {
    await api.delete(`/admin/templates/${id}`)
  },

  async getUploads(): Promise<UploadResult[]> {
    const { data } = await api.get<ApiListResponse<UploadResult>>('/upload')
    return data.data
  },

  async deleteUpload(id: string): Promise<void> {
    await api.delete(`/upload/${id}`)
  },
}
