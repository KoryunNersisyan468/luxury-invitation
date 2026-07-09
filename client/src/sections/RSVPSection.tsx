import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { staggerContainer, staggerItem, defaultTransition } from '@/animations'
import { Button, Input, Textarea } from '@/components/ui'
import { notify } from '@/services/notification'
import type { WeddingRSVP, RSVPFormData } from '@/types'

const rsvpSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(6, 'Phone number required'),
  attendance: z.enum(['yes', 'no', 'maybe']),
  guests: z.number().min(0).max(10),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
})

interface RSVPSectionProps {
  rsvp: WeddingRSVP
  onSubmit: (data: RSVPFormData) => Promise<void>
}

export function RSVPSection({ rsvp, onSubmit }: RSVPSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attendance: 'yes',
      guests: 1,
    },
  })

  const handleFormSubmit = async (data: RSVPFormData) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
      notify.success('Շնորհակալություն: Ձեր պատասխանն ընդունված է:')
      reset()
    } catch {
      notify.error('Չհաջողվեց ուղարկել: Խնդրում ենք փորձել կրկին:')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-narrow">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            className="text-center mb-10"
            variants={staggerItem}
            transition={defaultTransition}
          >
            <h2 className="heading-section mb-4">{rsvp.title}</h2>
            <p className="font-body opacity-80">{rsvp.subtitle}</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="max-w-md mx-auto space-y-6"
            variants={staggerItem}
            transition={defaultTransition}
          >
            <div className="space-y-4">
              <Input
                {...register('name')}
                label="Անուն Ազգանուն"
                placeholder="Ձեր անունը"
                error={errors.name?.message}
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              />

              <Input
                {...register('email')}
                type="email"
                label="Էլ. փոստ"
                placeholder="your@email.com"
                error={errors.email?.message}
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              />

              <Input
                {...register('phone')}
                type="tel"
                label="Հեռախոս"
                placeholder="+374 XX XXX XXX"
                error={errors.phone?.message}
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              />

              {/* Attendance */}
              <div className="space-y-2">
                <label className="block text-sm font-medium opacity-80">
                  Կներկայանա՞ք
                </label>
                <div className="flex gap-4">
                  {[
                    { value: 'yes', label: 'Այո' },
                    { value: 'no', label: 'Ոչ' },
                    { value: 'maybe', label: 'Միգուցե' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        {...register('attendance')}
                        type="radio"
                        value={option.value}
                        className="w-4 h-4 accent-primary-foreground"
                      />
                      <span className="text-sm font-body">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Input
                {...register('guests', { valueAsNumber: true })}
                type="number"
                label="Հյուրերի քանակը"
                min={0}
                max={10}
                error={errors.guests?.message}
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground"
              />

              <Textarea
                {...register('message')}
                label="Հաղորդագրություն (ըստ ցանկության)"
                placeholder="Ձեր մաղթանքը զույգին..."
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              isLoading={isSubmitting}
            >
              Ուղարկել
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}
