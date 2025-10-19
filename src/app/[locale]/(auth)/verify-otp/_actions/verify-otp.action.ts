'use server';

import { OtpValues } from '@/lib/schemes/verify-otp';
import { AuthResponse } from '@/lib/types/verify';

export async function VerifyAction(values: OtpValues) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const payload: ApiResponse<AuthResponse> = await response.json();

  return payload;
}
