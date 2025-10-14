'use server';

import { callApi } from '@/lib/utils/client.api';
import { ResetPasswordValues } from '@/lib/schemes/auth.schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function resetPasswordAction(values: ResetPasswordValues) {
  const email = cookies().get('reset_email')?.value;
  const payload = {
    email,
    password: values.password,
    confirmPassword: values.confirmPassword,
  };

  const res = await callApi('auth/resetPassword', 'POST', payload);

  if (res && res.status === 'success') {
    cookies().delete('reset_email');
    redirect('/login');
  }

  return res;
}
