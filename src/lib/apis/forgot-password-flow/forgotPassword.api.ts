'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { EmailValue } from '@/lib/schemes/forgotPassword.schema';
import { forgetPasswordErrorResponse } from '@/lib/types/forgot-password';

export const forgotPassword = async (email: EmailValue): Promise<forgetPasswordErrorResponse> => {
  try {
    const response = await fetch('https://flower.elevateegy.com/api/v1/auth/forgotPassword', {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
      },
      body: JSON.stringify(email),
    });

    const payload: forgetPasswordErrorResponse = await response.json();

    return payload;
  } catch (error) {
    return {
      error: 'error',
      info: `Something went wrong: ${error}`,
    } as forgetPasswordErrorResponse;
  }
};
