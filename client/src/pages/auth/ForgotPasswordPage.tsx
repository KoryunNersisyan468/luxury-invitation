import { useState } from 'react'
import { Link } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { authService } from '@/api/auth'
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/validation/auth'
import { notify } from '@/services/notification'
import { fadeUp, defaultTransition } from '@/animations'

export default function ForgotPasswordPage() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      await authService.forgotPassword(data.email)
      setSent(true)
    } catch (error) {
      notify.error(error instanceof Error ? error.message : t('notify.genericError'))
    }
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={defaultTransition}
      >
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('common.backToLogin')}
        </Link>

        {sent ? (
          <div className="text-center bg-card border border-border rounded-2xl p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h1 className="heading-section text-foreground">{t('auth.forgot.sentTitle')}</h1>
            <p className="text-sm text-muted-foreground mt-2">{t('auth.forgot.sentBody')}</p>
            <Link to="/login" className="mt-6 inline-block">
              <Button variant="outline">{t('common.backToLogin')}</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h1 className="heading-section text-foreground">{t('auth.forgot.title')}</h1>
              <p className="text-sm text-muted-foreground mt-2">{t('auth.forgot.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card border border-border rounded-2xl p-6">
              <Input
                {...register('email')}
                type="email"
                label={t('common.email')}
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email?.message ? t(errors.email.message) : undefined}
              />

              <Button type="submit" className="w-full" isLoading={isSubmitting}>
                {t('auth.forgot.submit')}
              </Button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  )
}
