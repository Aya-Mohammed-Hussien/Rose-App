'use server';

import { callApi } from '@/lib/utils/client.api';
import { ForgotPasswordValues } from '@/lib/schemes/auth.schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function forgetPasswordAction(values: ForgotPasswordValues) {
  const email = String(values.email || '').trim();
  const payload = { email };

  await callApi('auth/forgotPassword', 'POST', payload);

  cookies().set('reset_email', email, {
    httpOnly: true,
  });

  redirect('/otp');
}
