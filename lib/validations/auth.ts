import { z } from "zod";

export const loginSchema = z.object({
  identifier: z.string().min(3, "Username atau email wajib diisi"),
  password: z.string().min(8, "Password minimal 8 karakter"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z.object({
  identifier: z.string().min(3, "Username atau email wajib diisi"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
