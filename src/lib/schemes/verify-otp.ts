'use client';

import { z } from 'zod';
export const otpSchema = z.object({
  resetCode: z
    .string('Please Enter the 6-digit code')
    .nonempty('Please Enter the 6-digit code')
    .length(6, 'Please Enter the 6-digit code'),
});

export type OtpValues = z.infer<typeof otpSchema>;
