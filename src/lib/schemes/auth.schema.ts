// lib/schemes/auth.schema.ts
import { z } from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { GENDER } from '../constants/auth.constant';
import { useTranslations } from 'next-intl';

// forgot Password Schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .nonempty({ message: 'Email is required.' }),
});

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

// Reset Password Schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[A-Z]/, { message: 'Password must include at least one uppercase letter.' })
      .regex(/[a-z]/, { message: 'Password must include at least one lowercase letter.' })
      .regex(/[0-9]/, { message: 'Password must include at least one number.' }),
    confirmPassword: z.string().nonempty({ message: 'Please confirm your password.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

//Register Schema
const registerSchema = z
  .object({
    firstName: z.string('First name is required').nonempty('First name is required'),
    lastName: z.string('Last name is required').nonempty('Last name is required'),
    email: z.email('Invalid email address').nonempty('Email is required'),
    password: z
      .string('Password is required')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number   '
      ),
    rePassword: z.string('Please confirm your password'),
    phone: z
      .string('Phone number is required')
      .nonempty('Phone number is required')
      .refine((value) => isValidPhoneNumber(value, 'EG'), 'please enter a valid phone number'),
    gender: z.enum(GENDER),
  })
  .refine((values) => values.password === values.rePassword, {
    error: 'passwords do not match',
    path: ['rePassword', 'password'],
  });

type RegisterValues = z.infer<typeof registerSchema>;

// Login schema
export const useLoginSchema = () => {
  const t = useTranslations('auth.login.validation');

  const loginSchema = z.object({
    email: z.string().nonempty(t('email_required')).email(t('email_invalid')),
    password: z.string().min(1, t('password_required')),
  });
  return { loginSchema };
};

type LoginValues = z.infer<ReturnType<typeof useLoginSchema>['loginSchema']>;

//Export

export { registerSchema };
export type { LoginValues, RegisterValues };
