'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { OtpValues } from '@/lib/schemes/verify-otp';
import { AuthResponse } from '@/lib/types/verify';

export async function VerifyAction(values: OtpValues) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      ...JSON_HEADER,
      Accept: 'application/json',
    },
  });

  const payload: ApiResponse<AuthResponse> = await response.json();

  if (!payload) {
    throw new Error('Something went wrong');
  }

  return payload;
}
