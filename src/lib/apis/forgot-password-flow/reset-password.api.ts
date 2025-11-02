'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { ResetData, ResetPasswordResponse } from '@/lib/types/forgot-password';

export const ResetPasswordApi = async (data: ResetData): Promise<ResetPasswordResponse> => {
  try {
    const response = await fetch('https://flower.elevateegy.com/api/v1/auth/resetPassword', {
      method: 'PUT',
      headers: {
        ...JSON_HEADER,
      },
      body: JSON.stringify(data),
    });

    const payload: ResetPasswordResponse = await response.json();

    return payload;
  } catch (error) {
    return {
      message: 'error',
      code: `Something went wrong: ${error}`,
    } as ResetPasswordResponse;
  }
};
