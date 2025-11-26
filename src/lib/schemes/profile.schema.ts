import { isValidPhoneNumber } from 'react-phone-number-input';
import z from 'zod';
import { GENDER } from '../constants/auth.constant';

export const ProfileSchema = (t: (key: string) => string) =>
  z.object({
    // First Name
    firstName: z
      .string()
      .trim()
      .regex(/^[a-zA-Z\u0600-\u06FF\s'-]+$/, t('first-name.format'))
      .min(2, t('first-name.minimum'))
      .max(30, t('first-name.maximum')),

    // Last Name
    lastName: z
      .string()
      .trim()
      .regex(/^[a-zA-Z\u0600-\u06FF\s'.-]+$/, t('last-name.format'))
      .min(2, t('last-name.minimum'))
      .max(30, t('last-name.maximum')),

    // Email
    email: z.string().trim().min(1, t('email.minimum')).email(t('email.invalid-email')),

    // Phone
    phone: z
      .string()
      .trim()
      .min(1, t('phone.minimum'))
      .refine((value) => isValidPhoneNumber(value), t('phone.valid-phone')),

    // Gender
    gender: z.enum(GENDER),
  });

export type ProfileSchemaType = ReturnType<typeof ProfileSchema>;
export type profileValues = z.infer<ProfileSchemaType>;
