import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { authService } from '@/api/auth'
import { getToken, setToken, clearToken, isRememberMe } from '@/lib/storage'
import type { User } from '@/types/auth'

interface AuthContextValue {
  user: User | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  login: (email: string, password: string, remember?: boolean) => Promise<void>
  register: (email: string, password: string, remember?: boolean) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    const token = getToken()
    if (!token) {
      setUser(null)
      return
    }

    try {
      const profile = await authService.me()
      setUser(profile)
    } catch {
      clearToken()
      setUser(null)
    }
  }, [])

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false))
  }, [refreshUser])

  useEffect(() => {
    const handleLogout = () => {
      clearToken()
      setUser(null)
    }
    const handleLogin = () => {
      refreshUser()
    }
    window.addEventListener('auth:logout', handleLogout)
    window.addEventListener('auth:login', handleLogin)
    return () => {
      window.removeEventListener('auth:logout', handleLogout)
      window.removeEventListener('auth:login', handleLogin)
    }
  }, [refreshUser])

  const login = useCallback(async (email: string, password: string, remember = isRememberMe()) => {
    const response = await authService.login({ email, password })
    setToken(response.token, remember)
    setUser(response.user)
  }, [])

  const register = useCallback(async (email: string, password: string, remember = true) => {
    const response = await authService.register({ email, password })
    setToken(response.token, remember)
    setUser(response.user)
  }, [])

  const logout = useCallback(() => {
    clearToken()
    setUser(null)
    window.dispatchEvent(new CustomEvent('auth:logout'))
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'ADMIN',
      isLoading,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, register, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
