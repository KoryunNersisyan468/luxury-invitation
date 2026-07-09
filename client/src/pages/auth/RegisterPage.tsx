import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Button, Input } from '@/components/ui'
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons'
import { useAuth } from '@/context/AuthContext'
import { registerSchema, type RegisterFormValues } from '@/validation/auth'
import { notify } from '@/services/notification'
import { fadeUp, defaultTransition } from '@/animations'

export default function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await registerUser(data.email, data.password, true)
      notify.success(t('notify.registerSuccess'))
      navigate('/')
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
          <h1 className="heading-section text-foreground">{t('auth.register.title')}</h1>
          <p className="text-sm text-muted-foreground mt-2">
            {t('auth.register.subtitle')}
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
            {t('auth.register.submit')}
          </Button>

          <SocialLoginButtons />

          <p className="text-center text-sm text-muted-foreground">
            {t('auth.register.haveAccount')}{' '}
            <Link to="/login" className="text-primary hover:underline">
              {t('auth.register.signIn')}
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
