import { api } from './client'
import type { AuthResponse, LoginCredentials, MeResponse, RegisterCredentials, User } from '@/types/auth'

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    })
    return data
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register', {
      email: credentials.email,
      password: credentials.password,
    })
    return data
  },

  async googleAuth(idToken: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/google', {
      idToken,
    })
    return data
  },

  async facebookAuth(accessToken: string): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/facebook', {
      accessToken,
    })
    return data
  },

  async forgotPassword(email: string): Promise<{ message: string }> {
    const { data } = await api.post<{ status: string; message: string }>('/auth/forgot-password', {
      email,
    })
    return { message: data.message }
  },

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    const { data } = await api.post<{ status: string; message: string }>('/auth/reset-password', {
      token,
      password,
    })
    return { message: data.message }
  },

  async me(): Promise<User> {
    const { data } = await api.get<MeResponse>('/auth/me')
    return data.data
  },
}
