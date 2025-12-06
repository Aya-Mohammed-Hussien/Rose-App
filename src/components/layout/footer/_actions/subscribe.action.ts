'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { SubscribeValue } from '@/lib/schemes/subscribe.schema';
import { SubscriptionResponse } from '@/lib/types/subscription';

export async function subscribeAction(data: SubscribeValue) {
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
    return error;
  }
}
