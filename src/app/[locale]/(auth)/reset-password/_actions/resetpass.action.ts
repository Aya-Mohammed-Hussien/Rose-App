'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
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

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/resetPassword`, {
    method: 'POST',
    headers: {
      ...JSON_HEADER,
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const response = await res.json();

  if (response && response.status === 'success') {
    cookies().delete('reset_email');
    redirect('/login');
  }

  return response;
}
