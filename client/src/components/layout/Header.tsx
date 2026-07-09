import { Link, NavLink } from 'react-router'
import { Heart, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useAuth } from '@/context/AuthContext'
import { INVITATION_CATEGORIES, getCategoryName } from '@/lib/categories'
import { cn } from '@/utils'

export function Header() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const { t, i18n } = useTranslation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'text-sm font-body transition-colors hover:text-primary',
      isActive ? 'text-primary font-medium' : 'text-foreground/70',
    )

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="container-narrow flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-serif text-lg text-primary">
          <Heart className="h-5 w-5 fill-primary" aria-hidden="true" />
          Belle Ame
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          <NavLink to="/invitation" className={navLinkClass}>
            {t('nav.invitations')}
          </NavLink>
          <div className="relative group">
            <button
              type="button"
              className="text-sm font-body text-foreground/70 hover:text-primary transition-colors"
            >
              {t('nav.styles')}
            </button>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block">
              <div className="min-w-[200px] rounded-sm border border-border bg-card p-2 shadow-lg">
                {INVITATION_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/categories/${cat.slug}`}
                    className="block rounded-sm px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    {getCategoryName(cat, i18n.language)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <NavLink to="/create" className={navLinkClass}>
            {t('nav.create')}
          </NavLink>
          <div className="relative group">
            <button
              type="button"
              className="text-sm font-body text-foreground/70 hover:text-primary transition-colors"
            >
              {t('nav.more')}
            </button>
            <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block">
              <div className="min-w-[180px] rounded-sm border border-border bg-card p-2 shadow-lg">
                <Link
                  to="/about"
                  className="block rounded-sm px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {t('nav.about')}
                </Link>
                <Link
                  to="/contact"
                  className="block rounded-sm px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {t('nav.contact')}
                </Link>
                <Link
                  to="/privacy"
                  className="block rounded-sm px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {t('nav.privacy')}
                </Link>
                <Link
                  to="/terms"
                  className="block rounded-sm px-3 py-2 text-sm hover:bg-muted transition-colors"
                >
                  {t('nav.terms')}
                </Link>
              </div>
            </div>
          </div>
          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass}>
              {t('nav.admin')}
            </NavLink>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageSwitcher />
          {isAuthenticated ? (
            <>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {user?.email}
              </span>
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="ghost" size="sm">
                    <LayoutDashboard className="h-4 w-4" />
                    {t('nav.dashboard')}
                  </Button>
                </Link>
              )}
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
                {t('nav.logout')}
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">{t('nav.login')}</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">{t('nav.register')}</Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3" aria-label="Mobile navigation">
          <NavLink to="/invitation" className={navLinkClass} onClick={() => setMobileOpen(false)}>
            {t('nav.invitations')}
          </NavLink>
          <NavLink to="/create" className={navLinkClass} onClick={() => setMobileOpen(false)}>
            {t('nav.create')}
          </NavLink>
          {INVITATION_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/categories/${cat.slug}`}
              className="block text-sm text-foreground/70 hover:text-primary pl-2"
              onClick={() => setMobileOpen(false)}
            >
              {getCategoryName(cat, i18n.language)}
            </Link>
          ))}
          <div className="pt-2 border-t border-border space-y-2 text-sm">
            <Link
              to="/about"
              className="block text-foreground/70 hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/contact"
              className="block text-foreground/70 hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            <Link
              to="/privacy"
              className="block text-foreground/70 hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.privacy')}
            </Link>
            <Link
              to="/terms"
              className="block text-foreground/70 hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {t('nav.terms')}
            </Link>
          </div>
          {isAdmin && (
            <NavLink to="/admin" className={navLinkClass} onClick={() => setMobileOpen(false)}>
              {t('nav.admin')}
            </NavLink>
          )}
          <div className="pt-2 border-t border-border flex flex-col gap-2">
            {isAuthenticated ? (
              <Button variant="outline" size="sm" onClick={() => { logout(); setMobileOpen(false) }}>
                {t('nav.logout')}
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">{t('nav.login')}</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">{t('nav.register')}</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
