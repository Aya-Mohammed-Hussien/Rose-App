'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { changePasswordValues } from '@/lib/schemes/change-password.schema';
import { getToken } from '@/lib/utils/get-token.util';
import { cookies } from 'next/headers';

export const changePassword = async (
  userData: Omit<changePasswordValues, 'confirmNewPassword'>
) => {
  // Never throw — always return { success, error }
  try {
    const token = await getToken();
    const baseURL = process.env.NEXT_PUBLIC_API;

    if (!token) {
      return { success: false, error: 'No access token found' };
    }

    const response = await fetch(`${baseURL}/auth/change-password`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = await response.json();

    if (!response.ok) {
      return { success: false, error: payload.error || payload.message || 'Something went wrong' };
    }

    cookies().delete('next-auth.session-token');
    cookies().delete('__Secure-next-auth.session-token'); // ✅ also delete the secure one

    return { success: true, data: payload };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unexpected error while changing password',
    };
  }
};
