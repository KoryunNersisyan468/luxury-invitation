import axios from 'axios'
import i18n from '@/i18n'
import { getToken, clearToken } from '@/lib/storage'

// Forward the active UI language so the backend can localize responses.
const withLanguage = (config: import('axios').InternalAxiosRequestConfig) => {
  const lang = i18n.resolvedLanguage ?? 'en'
  config.headers.set?.('Accept-Language', lang)
  config.headers.set?.('x-lang', lang)
  return config
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 12000,
})

api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return withLanguage(config)
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearToken()
      if (!window.location.pathname.startsWith('/login')) {
        window.dispatchEvent(new CustomEvent('auth:logout'))
      }
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      'Անհայտ սխալ: Խնդրում ենք փորձել կրկին։'

    return Promise.reject(new Error(message))
  },
)

export const uploadApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  timeout: 30000,
})

uploadApi.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return withLanguage(config)
})

uploadApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Upload failed. Please try again.'

    return Promise.reject(new Error(message))
  },
)
