import { motion } from 'framer-motion'
import { fadeUp, defaultTransition } from '@/animations'
import { cn } from '@/utils'

interface SectionHeadingProps {
  title: string
  description?: string
  className?: string
}

export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <motion.div
      className={cn('space-y-3 text-center', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
      transition={defaultTransition}
    >
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Belle Ame</p>
      <h2 className="heading-section text-3xl md:text-4xl text-foreground">{title}</h2>
      {description ? <p className="text-body text-muted-foreground max-w-2xl mx-auto">{description}</p> : null}
    </motion.div>
  )
}
