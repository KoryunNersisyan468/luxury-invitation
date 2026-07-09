import { motion } from 'framer-motion'
import { fadeUp, defaultTransition } from '@/animations'
import { FloralCorner } from '@/components/FloralDecorations'

interface StorySectionProps {
  title: string
  content: string
}

export function StorySection({ title, content }: StorySectionProps) {
  return (
    <section className="relative section-padding">
      {/* Floral corners */}
      <FloralCorner className="absolute top-8 left-4 text-primary opacity-60" />
      <FloralCorner className="absolute top-8 right-4 text-primary opacity-60 scale-x-[-1]" />

      <div className="container-narrow">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUp}
          transition={defaultTransition}
        >
          <h2 className="heading-section text-primary mb-8">{title}</h2>
          <p className="text-body text-foreground/80 leading-relaxed whitespace-pre-line">
            {content}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
