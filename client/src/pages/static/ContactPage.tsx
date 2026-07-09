import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'
import { notify } from '@/services/notification'
import { fadeUp, defaultTransition } from '@/animations'

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (_data: ContactFormValues) => {
    notify.info('Contact form submitted. Backend contact API is not available — please email hello@belleame.com directly.')
    reset()
  }

  return (
    <div className="container-narrow py-16 md:py-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={defaultTransition}
        className="grid md:grid-cols-2 gap-12"
      >
        <div>
          <h1 className="heading-section text-primary mb-4">Contact us</h1>
          <p className="text-body text-foreground/70 mb-8">
            Have questions about creating your wedding invitation? We&apos;d love to hear from you.
          </p>

          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 text-muted-foreground">
              <Mail className="h-5 w-5 text-primary" />
              hello@belleame.com
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <Phone className="h-5 w-5 text-primary" />
              +374 10 000 000
            </li>
            <li className="flex items-center gap-3 text-muted-foreground">
              <MapPin className="h-5 w-5 text-primary" />
              Yerevan, Armenia
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card border border-border rounded-sm p-6">
          <Input {...register('name')} label="Name" error={errors.name?.message} />
          <Input {...register('email')} type="email" label="Email" error={errors.email?.message} />
          <Input {...register('subject')} label="Subject" error={errors.subject?.message} />
          <Textarea {...register('message')} label="Message" rows={5} error={errors.message?.message} />
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Send message
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
