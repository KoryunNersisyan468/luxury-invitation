import type { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { Toaster } from 'sonner'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

interface DefaultLayoutProps {
  children: ReactNode
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  const isInvitationDetail = /^\/invitation\/[^/]+$/.test(location.pathname)

  if (isAdminRoute) {
    return (
      <>
        {children}
        <Toaster position="top-center" richColors />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {!isInvitationDetail && <Header />}
      <main className="flex-1">{children}</main>
      {!isInvitationDetail && <Footer />}
      <Toaster position="top-center" richColors />
    </div>
  )
}
