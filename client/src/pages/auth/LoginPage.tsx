import { Link, useNavigate, useLocation } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons'
import { useAuth } from '@/context/AuthContext'
import { loginSchema, type LoginFormValues } from '@/validation/auth'
import { notify } from '@/services/notification'
import { fadeUp, defaultTransition } from '@/animations'

import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function LoginPage() {
  const { t } = useTranslation()
  useDocumentTitle(t('auth.login.submit'))
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const from = (location.state as { from?: string })?.from ?? '/'

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember: false },
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password, data.remember)
      notify.success(t('notify.loginSuccess'))
      navigate(from, { replace: true })
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
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-serif text-2xl text-primary mb-2">
            <Heart className="h-6 w-6 fill-primary" />
            Belle Ame
          </Link>
          <h1 className="heading-section text-foreground">{t('auth.login.title')}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {t('auth.login.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card border border-border rounded-sm p-6">
          <Input
            {...register('email')}
            type="email"
            label={t('common.email')}
            placeholder="you@example.com"
            autoComplete="email"
            error={errors.email?.message ? t(errors.email.message) : undefined}
          />

          <Input
            {...register('password')}
            type="password"
            label={t('common.password')}
            placeholder="••••••••"
            autoComplete="current-password"
            error={errors.password?.message ? t(errors.password.message) : undefined}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                {...register('remember')}
                className="rounded border-input accent-primary"
              />
              {t('auth.login.remember')}
            </label>
            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
              {t('auth.login.forgot')}
            </Link>
          </div>

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            {t('auth.login.submit')}
          </Button>

          <SocialLoginButtons />

          <p className="text-center text-sm text-muted-foreground">
            {t('auth.login.noAccount')}{' '}
            <Link to="/register" className="text-primary hover:underline">
              {t('auth.login.signUp')}
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
