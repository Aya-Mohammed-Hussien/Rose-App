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
    .max(30, 'Name must be less than 30 characters'),

  // last name
  lastName: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\u0600-\u06FF\s'.-]+$/, 'Invalid name format')
    .min(2, 'Name must be at least 2 characters')
    .max(30, 'Name must be less than 30 characters'),

  // email
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address'),

  // phone
  phone: z
    .string()
    .trim()
    .min(1, 'Phone is required')
    .refine((value) => isValidPhoneNumber(value), 'Please enter a valid phone number'),

  // gender
  gender: z.enum(GENDER),
});

export type profileValues = z.infer<typeof profileSchema>;
