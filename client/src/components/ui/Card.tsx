import { cn } from '@/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-sm border border-border bg-card p-6 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 pb-4', className)}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <h3 className={cn('font-serif text-xl font-semibold leading-none tracking-tight', className)}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className }: CardProps) {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  )
}

export function CardContent({ children, className }: CardProps) {
  return <div className={cn('pt-0', className)}>{children}</div>
}

export function CardFooter({ children, className }: CardProps) {
  return (
    <div className={cn('flex items-center pt-4', className)}>{children}</div>
  )
}
