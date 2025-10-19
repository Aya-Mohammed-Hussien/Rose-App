'use server';

import { RegisterValues } from '../schemes/auth.schema';
import { AuthResponse } from '../types/auth';

export async function registerAction(values: RegisterValues) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(values),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  const payload: ApiResponse<AuthResponse> = await response.json();
  console.log(payload);

  return payload;
}
