import { useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, KeyRound, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { authService } from '@/api/auth'
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/validation/auth'
import { notify } from '@/services/notification'
import { fadeUp, defaultTransition } from '@/animations'

export default function ResetPasswordPage() {
  const { t } = useTranslation()
  const [params] = useSearchParams()
  const token = params.get('token') ?? ''
  const [done, setDone] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await authService.resetPassword(token, data.password)
      setDone(true)
    } catch (error) {
      notify.error(error instanceof Error ? error.message : t('notify.genericError'))
    }
  }

  const shell = (children: React.ReactNode) => (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <motion.div
        className="w-full max-w-md"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={defaultTransition}
      >
        {children}
      </motion.div>
    </div>
  )

  if (!token) {
    return shell(
      <div className="text-center bg-card border border-border rounded-2xl p-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <h1 className="heading-section text-foreground">{t('auth.reset.invalidTitle')}</h1>
        <p className="text-sm text-muted-foreground mt-2">{t('auth.reset.invalidBody')}</p>
        <Link to="/forgot-password" className="mt-6 inline-block">
          <Button>{t('auth.reset.requestNew')}</Button>
        </Link>
      </div>,
    )
  }

  if (done) {
    return shell(
      <div className="text-center bg-card border border-border rounded-2xl p-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h1 className="heading-section text-foreground">{t('auth.reset.successTitle')}</h1>
        <p className="text-sm text-muted-foreground mt-2">{t('auth.reset.successBody')}</p>
        <Link to="/login" className="mt-6 inline-block">
          <Button>{t('auth.reset.goToLogin')}</Button>
        </Link>
      </div>,
    )
  }

  return shell(
    <>
      <Link
        to="/login"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        {t('common.backToLogin')}
      </Link>

      <div className="text-center mb-8">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
          <KeyRound className="h-6 w-6" />
        </div>
        <h1 className="heading-section text-foreground">{t('auth.reset.title')}</h1>
        <p className="text-sm text-muted-foreground mt-2">{t('auth.reset.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card border border-border rounded-2xl p-6">
        <Input
          {...register('password')}
          type="password"
          label={t('common.newPassword')}
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.password?.message ? t(errors.password.message) : undefined}
        />
        <Input
          {...register('confirmPassword')}
          type="password"
          label={t('common.confirmPassword')}
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.confirmPassword?.message ? t(errors.confirmPassword.message) : undefined}
        />
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          {t('auth.reset.submit')}
        </Button>
      </form>
    </>,
  )
}
