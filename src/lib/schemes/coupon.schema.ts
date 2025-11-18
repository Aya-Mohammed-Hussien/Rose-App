import { z } from 'zod';

export const couponSchema = z.object({
  code: z
    .string()
    .min(3, 'Code must be at least 3 characters')
    .max(30, 'Code must be at most 30 characters')
    .regex(/^[A-Z0-9-_]+$/, 'Invalid code format'),
});

export type CouponValues = z.infer<typeof couponSchema>;
