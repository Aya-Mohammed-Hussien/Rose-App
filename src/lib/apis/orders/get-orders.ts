import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { GetOrdersResponse } from '@/lib/types/orders';
import { getToken } from '@/lib/utils/get-token.util';

export const getOrders = async (): Promise<GetOrdersResponse> => {
  try {
    const jwt = await getToken();

    if (!jwt) {
      throw new Error('No access token found. Please log in again.');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API;
    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_API environment variable is not set');
    }

    const res = await fetch(`${apiUrl}/orders`, {
      method: 'GET',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${jwt}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      let errorMessage = `Failed to fetch Orders: ${res.status} ${res.statusText}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use the status text
      }
      throw new Error(errorMessage);
    }

    const data: GetOrdersResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch orders');
  }
};
