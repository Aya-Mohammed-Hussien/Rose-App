'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { AddReviewResponse, ReviewData } from '@/lib/types/add-review';
import { getToken } from '@/lib/utils/get-token';

export const AddReviewAction = async (answers: ReviewData) => {
  try {
    const jwt = await getToken();
    console.log('token', jwt);
    if (!jwt) {
      throw new Error('No access token found');
    }

    const response = await fetch('https://flower.elevateegy.com/api/v1/reviews', {
      method: 'POST',
      body: JSON.stringify(answers),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${jwt}`,
      },
    });

    const payload: ApiResponse<AddReviewResponse> = await response.json();

    if ('error' in payload) {
      return payload.error;
    }
    return payload;
  } catch (error) {
    throw new Error(`failed to fetch answers data ${error}`);
  }
};
