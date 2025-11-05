import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { GetOrdersResponse } from '@/lib/types/orders';
import { getToken } from '@/lib/utils/get-token.util';

export const getOrders = async (): Promise<GetOrdersResponse> => {
  const jwt = await getToken();

  if (!jwt) {
    return { error: 'No access token found' };
  }
  try {
    const res = await fetch(`https://flower.elevateegy.com/api/v1/orders`, {
      method: 'GET',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch reviews: ${res.statusText}`);
    }

    const data: GetOrdersResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
};
