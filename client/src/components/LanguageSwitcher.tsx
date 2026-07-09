import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n'
import { cn } from '@/utils'

const LABELS: Record<SupportedLanguage, { native: string; short: string }> = {
  en: { native: 'English', short: 'EN' },
  ru: { native: 'Русский', short: 'RU' },
  hy: { native: 'Հայերեն', short: 'ՀԱ' },
}

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const current = (i18n.resolvedLanguage ?? 'en') as SupportedLanguage

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const change = (lng: SupportedLanguage) => {
    i18n.changeLanguage(lng)
    setOpen(false)
  }

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-sm text-foreground/80 transition-colors hover:border-primary/50 hover:text-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('language.label')}
      >
        <Globe className="h-4 w-4" aria-hidden="true" />
        <span className="font-medium">{LABELS[current]?.short ?? 'EN'}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg"
        >
          {SUPPORTED_LANGUAGES.map((lng) => (
            <li key={lng} role="option" aria-selected={lng === current}>
              <button
                type="button"
                onClick={() => change(lng)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted',
                  lng === current ? 'text-primary font-medium' : 'text-foreground/80',
                )}
              >
                {LABELS[lng].native}
                {lng === current && <Check className="h-4 w-4" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
