export interface PaginationMeta {
  total: number
  page: number
  limit: number
  pages: number
}

export interface ApiListResponse<T> {
  status: 'success'
  meta: PaginationMeta
  data: T[]
}

export interface ApiItemResponse<T> {
  status: 'success'
  data: T
}

export interface UploadResult {
  id?: string
  url: string
  publicId: string
  width?: number
  height?: number
  createdAt?: string
}
