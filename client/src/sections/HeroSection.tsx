import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, defaultTransition } from '@/animations'

interface HeroSectionProps {
  groomName: string
  brideName: string
  groomNameEn: string
  brideNameEn: string
  heroImage: string
  subtitle: string
}

export function HeroSection({
  groomName,
  brideName,
  groomNameEn,
  brideNameEn,
  heroImage,
  subtitle,
}: HeroSectionProps) {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Wedding couple"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center text-white px-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Armenian Names - Stylized */}
        <motion.div
          variants={staggerItem}
          transition={defaultTransition}
          className="mb-6"
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide">
            <span className="block">{groomName}</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl my-4 font-light opacity-80">
              &
            </span>
            <span className="block">{brideName}</span>
          </h1>
        </motion.div>

        {/* English Names */}
        <motion.p
          variants={staggerItem}
          transition={defaultTransition}
          className="text-lg md:text-xl tracking-[0.3em] uppercase opacity-80 mb-8"
        >
          {groomNameEn} & {brideNameEn}
        </motion.p>

        {/* Subtitle */}
        <motion.p
          variants={staggerItem}
          transition={defaultTransition}
          className="text-xl md:text-2xl font-light opacity-90 max-w-xl mx-auto"
        >
          {subtitle}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-white/70 rounded-full mt-2"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
