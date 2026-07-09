const TOKEN_KEY = 'auth_token'
const REMEMBER_KEY = 'auth_remember'

export function getStorage(remember: boolean): Storage {
  return remember ? localStorage : sessionStorage
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string, remember: boolean): void {
  clearToken()
  getStorage(remember).setItem(TOKEN_KEY, token)
  if (remember) {
    localStorage.setItem(REMEMBER_KEY, 'true')
  } else {
    localStorage.removeItem(REMEMBER_KEY)
  }
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REMEMBER_KEY)
}

export function isRememberMe(): boolean {
  return localStorage.getItem(REMEMBER_KEY) === 'true'
}
