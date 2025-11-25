'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { OtpValues } from '@/lib/schemes/forgotPassword.schema';
import { otpApiErrorResponse } from '@/lib/types/forgot-password';

export const verifyOtpApi = async (data: OtpValues): Promise<otpApiErrorResponse> => {
  try {
    const response = await fetch('https://flower.elevateegy.com/api/v1/auth/verifyResetCode', {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
      },
      body: JSON.stringify(data),
    });

    const payload: otpApiErrorResponse = await response.json();

    return payload;
  } catch (error) {
    return {
      error: 'error',
      info: `Something went wrong: ${error}`,
    } as otpApiErrorResponse;
  }
};
