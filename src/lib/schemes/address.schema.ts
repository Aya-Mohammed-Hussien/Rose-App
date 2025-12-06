import * as z from 'zod';
import { isValidPhoneNumber } from 'react-phone-number-input';

// Address schema
export const addressSchema = z.object({
  street: z.string().min(1, 'Street is required').max(100, 'Street name is too long'),
  phone: z
    .string('Phone number is required')
    .nonempty('Phone number is required')
    .refine((value) => isValidPhoneNumber(value, 'EG'), 'please enter a valid phone number'),
  city: z.string().min(1, 'City is required').max(50, 'City name is too long'),
  username: z.string().min(1, 'username is required'),
});

// Location Schema 
export const addressSubmissionSchema = addressSchema.extend({
  lat: z.string().min(1, 'Lat is required'),
  long: z.string().min(1, 'Long is required'),
});
export type AddressValue = z.infer<typeof addressSchema>;
export type AddressSubmissionValue = z.infer<typeof addressSubmissionSchema>
