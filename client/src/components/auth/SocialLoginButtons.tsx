import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Button } from '@/components/ui'
import { authService } from '@/api/auth'
import { setToken } from '@/lib/storage'
import { notify } from '@/services/notification'

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: any) => void
          renderButton: (element: HTMLElement, options: any) => void
        }
      }
    }
    FB: {
      init: (config: any) => void
      login: (callback: (response: any) => void, options: any) => void
    }
  }
}

export function SocialLoginButtons() {
  const navigate = useNavigate()
  const location = useLocation()
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID
  const from = (location.state as { from?: string })?.from ?? '/'

  // Initialize Google Sign-In
  useEffect(() => {
    if (!googleClientId || !window.google) return

    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: async (response: any) => {
        try {
          const authResponse = await authService.googleAuth(response.credential)
          setToken(authResponse.token, true)
          notify.success('Signed in with Google')
          window.dispatchEvent(new CustomEvent('auth:login'))
          navigate(from, { replace: true })
        } catch (error) {
          notify.error(error instanceof Error ? error.message : 'Google sign-in failed')
        }
      },
    })

    const container = document.getElementById('google-signin-button')
    if (container && !container.hasChildNodes()) {
      window.google.accounts.id.renderButton(container, {
        theme: 'outline',
        size: 'large',
        width: '100%',
      })
    }
  }, [googleClientId, navigate, from])

  // Initialize Facebook SDK
  useEffect(() => {
    if (!facebookAppId || !window.FB) return

    window.FB.init({
      appId: facebookAppId,
      xfbml: false,
      version: 'v18.0',
    })
  }, [facebookAppId])

  const handleFacebookLogin = () => {
    if (!window.FB) {
      notify.error('Facebook SDK not loaded')
      return
    }

    window.FB.login(
      async (response: any) => {
        if (response.authResponse) {
          try {
            const authResponse = await authService.facebookAuth(
              response.authResponse.accessToken,
            )
            setToken(authResponse.token, true)
            notify.success('Signed in with Facebook')
            window.dispatchEvent(new CustomEvent('auth:login'))
            navigate(from, { replace: true })
          } catch (error) {
            notify.error(
              error instanceof Error ? error.message : 'Facebook sign-in failed',
            )
          }
        } else {
          notify.error('Facebook login cancelled')
        }
      },
      { scope: 'public_profile,email' },
    )
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div id="google-signin-button" className="flex justify-center" />

      {facebookAppId && facebookAppId !== 'YOUR_FACEBOOK_APP_ID' && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleFacebookLogin}
        >
          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Continue with Facebook
        </Button>
      )}
    </div>
  )
}
