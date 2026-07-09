import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Sparkles, Calendar, MapPin, Mail } from 'lucide-react'
import { Button } from '@/components/ui'
import { FloralFrame } from '@/components/FloralDecorations'
import { fadeUp, staggerContainer, staggerItem, defaultTransition } from '@/animations'

export default function HomePage() {
  const { t } = useTranslation()

  const features = [
    { icon: Heart, title: t('home.features.storyTitle'), description: t('home.features.storyBody') },
    { icon: Calendar, title: t('home.features.calendarTitle'), description: t('home.features.calendarBody') },
    { icon: MapPin, title: t('home.features.locationsTitle'), description: t('home.features.locationsBody') },
    { icon: Mail, title: t('home.features.rsvpTitle'), description: t('home.features.rsvpBody') },
  ]

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Floral side decorations */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 h-full w-16 md:w-28 text-primary z-0"
      >
        <FloralFrame />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-0 top-0 h-full w-16 md:w-28 text-primary z-0 scale-x-[-1]"
      >
        <FloralFrame />
      </div>

      <main className="relative z-10">
        {/* Hero */}
        <section className="container-narrow min-h-screen flex flex-col items-center justify-center text-center py-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={staggerItem}
              transition={defaultTransition}
              className="flex items-center justify-center gap-2 text-secondary mb-6 uppercase tracking-[0.3em] text-sm font-body"
            >
              <Sparkles className="w-4 h-4" />
              {t('home.eyebrow')}
              <Sparkles className="w-4 h-4" />
            </motion.div>

            <motion.h1
              variants={staggerItem}
              transition={defaultTransition}
              className="heading-display text-primary text-balance mb-6"
            >
              {t('home.heroTitle')}
            </motion.h1>

            <motion.p
              variants={staggerItem}
              transition={defaultTransition}
              className="text-body text-foreground/70 max-w-xl mx-auto mb-10"
            >
              {t('home.heroSubtitle')}
            </motion.p>

            <motion.div
              variants={staggerItem}
              transition={defaultTransition}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/create">
                <Button size="lg">
                  {t('home.ctaCreate')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/invitation">
                <Button size="lg" variant="outline">
                  {t('home.ctaExample')}
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Features */}
        <section className="section-padding bg-muted/30">
          <div className="container-narrow">
            <motion.h2
              className="heading-section text-primary text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              transition={defaultTransition}
            >
              {t('home.featuresTitle')}
            </motion.h2>

            <motion.div
              className="grid sm:grid-cols-2 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  className="bg-card rounded-sm border border-border p-8 text-center"
                  variants={staggerItem}
                  transition={defaultTransition}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding">
          <div className="container-narrow text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUp}
              transition={defaultTransition}
            >
              <h2 className="heading-section text-primary mb-4">
                {t('home.ctaTitle')}
              </h2>
              <p className="text-body text-foreground/70 max-w-lg mx-auto mb-8">
                {t('home.ctaBody')}
              </p>
              <Link to="/create">
                <Button size="lg">
                  {t('home.ctaNow')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
