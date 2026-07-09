import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { Heart, Facebook, Instagram, Mail } from 'lucide-react'
import { INVITATION_CATEGORIES, getCategoryName } from '@/lib/categories'

export function Footer() {
  const { t, i18n } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-muted/30 mt-auto" role="contentinfo">
      <div className="container-narrow py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2 font-serif text-lg text-primary mb-4">
              <Heart className="h-5 w-5 fill-primary" aria-hidden="true" />
              Belle Ame
            </Link>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-foreground mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-sm font-body">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.about')}</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.privacy')}</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.terms')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-foreground mb-4">{t('footer.styles')}</h3>
            <ul className="space-y-2 text-sm font-body">
              {INVITATION_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/categories/${cat.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {getCategoryName(cat, i18n.language)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-foreground mb-4">{t('footer.connect')}</h3>
            <div className="flex gap-3 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@belleame.com"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">hello@belleame.com</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground font-body">
          <p className="flex items-center justify-center gap-1.5">
            &copy; {currentYear} Belle Âme. {t('footer.rights')}
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  )
}
