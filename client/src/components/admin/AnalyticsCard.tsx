import type { LucideIcon } from 'lucide-react'
import { cn } from '@/utils'

interface AnalyticsCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: string
  className?: string
}

export function AnalyticsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
}: AnalyticsCardProps) {
  return (
    <div className={cn('rounded-sm border border-border bg-card p-6', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-body">{title}</p>
          <p className="text-3xl font-serif text-foreground mt-1">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
          {trend && (
            <p className="text-xs text-primary mt-2">{trend}</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
