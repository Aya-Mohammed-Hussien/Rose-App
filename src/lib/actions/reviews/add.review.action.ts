'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { AddReviewResponse, ReviewData } from '@/lib/types/add-review';
import { getToken } from '@/lib/utils/get-token.util';

export const AddReviewAction = async (
  formData: ReviewData
): Promise<ApiResponse<AddReviewResponse>> => {
  try {
    const jwt = await getToken();

    if (!jwt) {
      return { error: 'No access token found' };
    }

    const response = await fetch('https://flower.elevateegy.com/api/v1/reviews', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${jwt}`,
      },
    });

    const payload = (await response.json()) as ApiResponse<AddReviewResponse>;

    return payload;
  } catch (error) {
    return { error: 'Failed to submit review. Please try again later.' };
  }
};
