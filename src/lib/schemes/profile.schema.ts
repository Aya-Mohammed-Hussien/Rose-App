import { isValidPhoneNumber } from 'react-phone-number-input';
import z from 'zod';
import { GENDER } from '../constants/auth.constant';

export const profileSchema = z.object({
  // first name
  firstName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\u0600-\u06FF\s'-]+$/, 'Invalid name format')
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be less than 30 characters')
    .or(z.literal(''))
    .optional(),

  // last name
  lastName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\u0600-\u06FF\s'.-]+$/, 'Invalid name format')
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be less than 30 characters')
    .or(z.literal(''))
    .optional(),

  // email
  email: z.email('Invalid email address').trim().or(z.literal('')).optional(),

  // phone
  phone: z
    .string()
    .trim()
    .optional()
    .or(z.literal(''))
    .refine(
      (value) => !value || isValidPhoneNumber(value, 'EG'),
      'Please enter a valid phone number'
    ),

  // gender
  gender: z.enum(GENDER),
});

export type profileValues = z.infer<typeof profileSchema>;
