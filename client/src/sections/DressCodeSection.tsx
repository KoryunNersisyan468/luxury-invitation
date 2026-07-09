import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, defaultTransition } from '@/animations'
import type { WeddingDressCode } from '@/types'

interface DressCodeSectionProps {
  dressCode: WeddingDressCode
}

export function DressCodeSection({ dressCode }: DressCodeSectionProps) {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="heading-section text-primary text-center mb-4"
            variants={staggerItem}
            transition={defaultTransition}
          >
            {dressCode.title}
          </motion.h2>

          <motion.p
            className="text-center text-muted-foreground font-body max-w-xl mx-auto mb-10"
            variants={staggerItem}
            transition={defaultTransition}
          >
            {dressCode.description}
          </motion.p>

          {/* Image Gallery */}
          {dressCode.images.length > 0 && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"
              variants={staggerItem}
              transition={defaultTransition}
            >
              {dressCode.images.map((image, index) => (
                <motion.div
                  key={index}
                  className="aspect-[3/4] rounded-sm overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={image}
                    alt={`Dress code inspiration ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Color Palette */}
          {dressCode.colorPalette.length > 0 && (
            <motion.div
              className="text-center mb-8"
              variants={staggerItem}
              transition={defaultTransition}
            >
              <p className="text-sm text-muted-foreground font-body mb-4 uppercase tracking-wider">
                Առաջարկվող գույներ
              </p>
              <div className="flex justify-center gap-3">
                {dressCode.colorPalette.map((color, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-full border border-border shadow-sm"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Guidelines */}
          {dressCode.guidelines.length > 0 && (
            <motion.div
              className="text-center"
              variants={staggerItem}
              transition={defaultTransition}
            >
              <ul className="space-y-2">
                {dressCode.guidelines.map((guideline, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground font-body"
                  >
                    {guideline}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
