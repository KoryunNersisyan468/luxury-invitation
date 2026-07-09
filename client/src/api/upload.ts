import { uploadApi } from './client'
import type { ApiItemResponse } from '@/types/api'
import type { UploadResult } from '@/types/api'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type) && !file.type.startsWith('image/')) {
    return 'Only image files are allowed (JPEG, PNG, WebP, GIF).'
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'File size must not exceed 5 MB.'
  }
  return null
}

export const uploadService = {
  async uploadImage(file: File, onProgress?: (progress: number) => void): Promise<UploadResult> {
    const validationError = validateImageFile(file)
    if (validationError) {
      throw new Error(validationError)
    }

    const formData = new FormData()
    formData.append('file', file)

    const { data } = await uploadApi.post<ApiItemResponse<UploadResult>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (event.total) {
          onProgress?.(Math.round((event.loaded * 100) / event.total))
        }
      },
    })

    return data.data
  },

  async uploadImages(files: File[], onProgress?: (progress: number) => void): Promise<UploadResult[]> {
    const validationError = files.map(validateImageFile).find(Boolean)
    if (validationError) {
      throw new Error(validationError)
    }

    const formData = new FormData()
    files.forEach((file) => formData.append('files', file))

    const { data } = await uploadApi.post<ApiItemResponse<UploadResult | UploadResult[]>>('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (event.total) {
          onProgress?.(Math.round((event.loaded * 100) / event.total))
        }
      },
    })

    return Array.isArray(data.data) ? data.data : [data.data]
  },
}
