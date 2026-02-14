'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { SubscribeValue } from '@/lib/schemes/subscribe.schema';
import { SubscriptionResponse } from '@/lib/types/subscription';

export async function subscribeAction(
  data: SubscribeValue
): Promise<ApiResponse<SubscriptionResponse>> {
  try {
    const response = await fetch(`${process.env.API}/subscriptions/subscribe`, {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
      },
      body: JSON.stringify(data),
    });
    const payload: ApiResponse<SubscriptionResponse> = await response.json();
    if ('error' in payload) {
      console.log('Failed to subscribe', payload.error);
      return payload;
    }
    return payload;
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
}
