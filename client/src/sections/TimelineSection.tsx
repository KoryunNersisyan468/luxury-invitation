import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, defaultTransition } from '@/animations'
import type { WeddingTimeline } from '@/types'

interface TimelineSectionProps {
  timeline: WeddingTimeline
}

export function TimelineSection({ timeline }: TimelineSectionProps) {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-narrow">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="heading-section text-center mb-12 tracking-[0.2em]"
            variants={staggerItem}
            transition={defaultTransition}
          >
            {timeline.title}
          </motion.h2>

          <div className="max-w-2xl mx-auto">
            {timeline.events.map((event, index) => (
              <motion.div
                key={event.id}
                className="flex gap-6 mb-8 last:mb-0"
                variants={staggerItem}
                transition={{ ...defaultTransition, delay: index * 0.1 }}
              >
                {/* Time */}
                <div className="w-20 flex-shrink-0 text-right">
                  <span className="font-serif text-2xl">{event.time}</span>
                </div>

                {/* Line and dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-foreground/80" />
                  {index < timeline.events.length - 1 && (
                    <div className="w-px h-full bg-primary-foreground/30 my-2" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <h3 className="font-serif text-xl mb-1">{event.title}</h3>
                  {event.description && (
                    <p className="font-body text-sm opacity-80">{event.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
