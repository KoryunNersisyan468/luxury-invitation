import { z } from 'zod'

// Message strings are i18n keys; translate them at render time with t(message).
export const loginSchema = z.object({
  email: z.string().email('validation.email'),
  password: z.string().min(8, 'validation.passwordMin'),
  remember: z.boolean().optional().default(false),
})

export const registerSchema = z.object({
  email: z.string().email('validation.email'),
  password: z.string().min(8, 'validation.passwordMin'),
  confirmPassword: z.string().min(8, 'validation.passwordConfirm'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'validation.passwordsMismatch',
  path: ['confirmPassword'],
})

export const forgotPasswordSchema = z.object({
  email: z.string().email('validation.email'),
})

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'validation.passwordMin'),
  confirmPassword: z.string().min(8, 'validation.passwordConfirm'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'validation.passwordsMismatch',
  path: ['confirmPassword'],
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegisterFormValues = z.infer<typeof registerSchema>
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
