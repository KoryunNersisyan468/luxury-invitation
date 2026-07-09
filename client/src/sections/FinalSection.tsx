import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, defaultTransition } from '@/animations'
import { useCountdown } from '@/hooks'
import type { WeddingFinal } from '@/types'

interface FinalSectionProps {
  final: WeddingFinal
  weddingDate: string
}

export function FinalSection({ final, weddingDate }: FinalSectionProps) {
  const countdown = useCountdown(weddingDate)

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={final.image}
          alt="Wedding couple"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4 py-16"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h2
          className="font-serif text-4xl md:text-5xl mb-6"
          variants={staggerItem}
          transition={defaultTransition}
        >
          {final.title}
        </motion.h2>

        <motion.p
          className="font-body text-lg md:text-xl opacity-90 max-w-xl mx-auto mb-10"
          variants={staggerItem}
          transition={defaultTransition}
        >
          {final.message}
        </motion.p>

        {/* Mini Countdown */}
        <motion.div
          className="mb-10"
          variants={staggerItem}
          transition={defaultTransition}
        >
          <p className="text-sm uppercase tracking-wider mb-4 opacity-70">
            Հարսանիքին մնացել է
          </p>
          <div className="flex justify-center gap-6">
            {[
              { value: countdown.days, label: 'Օր' },
              { value: countdown.hours, label: 'Ժամ' },
              { value: countdown.minutes, label: 'Րոպե' },
              { value: countdown.seconds, label: 'Վրկ' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-serif text-3xl md:text-4xl">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs opacity-70 uppercase tracking-wider">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${(i * 8) % 100}%`,
              }}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{
                y: '-10vh',
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 12 + (i % 4) * 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
