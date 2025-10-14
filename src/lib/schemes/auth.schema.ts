// lib/schemes/auth.schema.ts
import { z } from "zod";

// forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email." })
    .nonempty({ message: "Email is required." }),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[A-Z]/, { message: "Password must include at least one uppercase letter." })
      .regex(/[a-z]/, { message: "Password must include at least one lowercase letter." })
      .regex(/[0-9]/, { message: "Password must include at least one number." }),
    confirmPassword: z.string().nonempty({ message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;
