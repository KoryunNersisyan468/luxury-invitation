import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui'
import { defaultTransition, staggerItem } from '@/animations'
import { Badge } from './Badge'
import { cn } from '@/utils'

interface TemplateCardProps {
  title: string
  subtitle: string
  accent: string
  variantClass: string
  buttonLabel?: string
  onSelect?: () => void
}

export function TemplateCard({ title, subtitle, accent, variantClass, buttonLabel = 'Choose style', onSelect }: TemplateCardProps) {
  return (
    <motion.article
      variants={staggerItem}
      transition={defaultTransition}
      className={cn(
        'group overflow-hidden rounded-[28px] border border-border bg-card shadow-[0_30px_80px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl',
        variantClass,
      )}
    >
      <div className="relative overflow-hidden p-6">
        <div className="absolute inset-x-0 top-0 h-32 opacity-20 bg-gradient-to-br from-white via-transparent to-transparent" />
        <div className="flex items-center justify-between mb-6">
          <Badge variant="outline" color="muted">Template</Badge>
          <span className="text-sm font-semibold text-muted-foreground">{accent}</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-foreground/90">
            <Heart className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground min-h-[2.5rem]">{subtitle}</p>
        </div>
      </div>
      <div className="border-t border-border bg-muted/70 p-6">
        <Button variant="outline" className="w-full" onClick={onSelect}>{buttonLabel}</Button>
      </div>
    </motion.article>
  )
}
