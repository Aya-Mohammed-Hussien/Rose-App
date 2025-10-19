'use server';

import { callApi } from '@/lib/utils/client.api';
import { ForgotPasswordValues } from '@/lib/schemes/auth.schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Server action to handle "forgot password" logic
export async function forgetPasswordAction(values: ForgotPasswordValues) {
  // Extract and sanitize email
  const email = String(values.email || '').trim();
  const payload = { email };

  // Send request to API endpoint
  await callApi('auth/forgotPassword', 'POST', payload);

  // Store email in cookies for later verification
  cookies().set('reset_email', email, {
    httpOnly: true,
  });

  // Redirect user to OTP verification page
  redirect('/otp');
}
