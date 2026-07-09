import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface FormSectionProps {
  icon: LucideIcon
  title: string
  description?: string
  children: ReactNode
}

export function FormSection({ icon: Icon, title, description, children }: FormSectionProps) {
  return (
    <section className="bg-card rounded-sm border border-border p-6 md:p-8">
      <header className="flex items-start gap-3 mb-6">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary flex-shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="font-serif text-xl text-foreground">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground font-body mt-0.5">{description}</p>
          )}
        </div>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
