export type UserRole = 'ADMIN' | 'USER'

export interface User {
  id: string
  email: string
  role: UserRole
  isEmailVerified?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface AuthResponse {
  status: 'success'
  token: string
  user: User
}

export interface MeResponse {
  status: 'success'
  data: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials extends LoginCredentials {}
