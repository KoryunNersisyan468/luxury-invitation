import { z } from "zod";

// Message strings are i18n keys resolved per-request in validateRequest.
export const registerSchema = z.object({
  email: z.string().email({ message: "validation.email" }),
  password: z.string().min(8, { message: "validation.password.min" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "validation.email" }),
  password: z.string().min(8, { message: "validation.password.required" }),
});

export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: "validation.email", invalid_type_error: "validation.email" })
    .email({ message: "validation.email" }),
});

export const resetPasswordSchema = z.object({
  token: z
    .string({ required_error: "validation.token.required", invalid_type_error: "validation.token.required" })
    .min(1, { message: "validation.token.required" }),
  password: z
    .string({ required_error: "validation.password.min", invalid_type_error: "validation.password.min" })
    .min(8, { message: "validation.password.min" }),
});
