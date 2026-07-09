import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import {
  LayoutDashboard,
  Mail,
  Settings,
  Heart,
  Upload,
  Users,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/utils'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/invitations', label: 'Invitations', icon: Heart },
  { to: '/admin/rsvps', label: 'RSVPs', icon: Mail },
  { to: '/admin/upload', label: 'Upload Manager', icon: Upload },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export function AdminLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/20 flex">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 w-64 bg-card border-r border-border transform transition-transform lg:translate-x-0 lg:static',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          <Link to="/admin" className="font-serif text-primary text-lg">
            Admin Panel
          </Link>
          <button
            type="button"
            className="lg:hidden p-1"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1" aria-label="Admin navigation">
          {navItems.map(({ to, label, icon: Icon, end }) => {
            const isActive = end
              ? location.pathname === to
              : location.pathname.startsWith(to)

            return (
              <Link
                key={to}
                to={to}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground/70 hover:bg-muted hover:text-foreground',
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <p className="text-xs text-muted-foreground truncate mb-2">{user?.email}</p>
          <Button variant="outline" size="sm" className="w-full" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close overlay"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-background/90 backdrop-blur flex items-center px-4 lg:px-8">
          <button
            type="button"
            className="lg:hidden mr-3 p-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-serif text-lg text-foreground">Belle Ame Admin</h1>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
