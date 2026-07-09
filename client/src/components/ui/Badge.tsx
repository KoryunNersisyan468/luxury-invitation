import { cn } from '@/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'soft' | 'solid' | 'outline'
  color?: 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'destructive'
  className?: string
}

const variants = {
  soft: {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    muted: 'bg-muted/80 text-foreground/80',
    success: 'bg-emerald-100 text-emerald-800',
    warning: 'bg-amber-100 text-amber-800',
    destructive: 'bg-red-100 text-red-700',
  },
  solid: {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    muted: 'bg-foreground text-background',
    success: 'bg-emerald-600 text-white',
    warning: 'bg-amber-500 text-foreground',
    destructive: 'bg-red-600 text-white',
  },
  outline: {
    primary: 'border border-primary text-primary',
    secondary: 'border border-secondary text-secondary',
    muted: 'border border-border text-muted-foreground',
    success: 'border border-emerald-300 text-emerald-700',
    warning: 'border border-amber-300 text-amber-800',
    destructive: 'border border-red-300 text-red-700',
  },
}

export function Badge({
  children,
  variant = 'soft',
  color = 'muted',
  className,
}: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]', variants[variant][color], className)}>
      {children}
    </span>
  )
}
