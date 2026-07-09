import { motion } from 'framer-motion'
import { MapPin, ExternalLink } from 'lucide-react'
import { staggerContainer, staggerItem, defaultTransition } from '@/animations'
import { Button } from '@/components/ui'
import type { WeddingLocation } from '@/types'

interface LocationsSectionProps {
  locations: WeddingLocation[]
}

export function LocationsSection({ locations }: LocationsSectionProps) {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-narrow">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.h2
            className="heading-section text-primary text-center mb-12"
            variants={staggerItem}
            transition={defaultTransition}
          >
            LOCATIONS
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {locations.map((location) => (
              <motion.div
                key={location.id}
                className="bg-card rounded-sm border border-border overflow-hidden"
                variants={staggerItem}
                transition={defaultTransition}
              >
                {/* Location Image or Icon */}
                {location.image ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-muted flex items-center justify-center">
                    <div className="text-center text-primary">
                      <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <span className="text-sm opacity-50">{location.type === 'ceremony' ? 'Պսակադրություն' : 'Հանդիսություն'}</span>
                    </div>
                  </div>
                )}

                {/* Location Details */}
                <div className="p-6 text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {location.type === 'ceremony' ? 'Պսակադրություն' : 'Հանդիսություն'}
                  </p>
                  <h3 className="font-serif text-xl text-foreground mb-1">
                    {location.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body mb-1">
                    {location.nameEn}
                  </p>
                  <p className="text-sm text-muted-foreground font-body mb-4">
                    {location.address}
                  </p>
                  
                  {location.mapUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(location.mapUrl, '_blank')}
                    >
                      <MapPin className="w-4 h-4" />
                      Քարտեզ
                      <ExternalLink className="w-3 h-3" />
                    </Button>
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
