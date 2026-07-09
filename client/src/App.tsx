import { AppRouter } from '@/router'
import { DefaultLayout } from '@/layouts/DefaultLayout'
import { AuthProvider } from '@/context/AuthContext'
import { LenisProvider, useLenis } from '@/hooks/useLenis'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

function ScrollToTop() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, lenis])

  return null
}

function App() {
  return (
    <AuthProvider>
      <LenisProvider>
        <ScrollToTop />
        <DefaultLayout>
          <AppRouter />
        </DefaultLayout>
      </LenisProvider>
    </AuthProvider>
  )
}

export default App
