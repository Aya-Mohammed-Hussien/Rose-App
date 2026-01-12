'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { getToken } from '@/lib/utils/get-token.util';

// Props
export type AddToCartData = {
  product: string;
  quantity: number;
};
export async function addToCartAction(data: AddToCartData) {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('No access token found. Please log in again.');
    }

    const apiUrl = process.env.NEXT_PUBLIC_API;
    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_API environment variable is not set');
    }

    console.log('Adding to cart:', data);

    const response = await fetch(`${apiUrl}/cart`, {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    // Try to parse response as JSON
    let payload;
    try {
      const text = await response.text();
      payload = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      payload = {};
    }

    if (!response.ok) {
      const errorMessage =
        payload?.message || payload?.error || `Failed to add item to cart (${response.status})`;
      console.error('Failed to add to cart:', response.status, payload);
      throw new Error(errorMessage);
    }

    console.log('Add to cart success:', payload);
    return payload;
  } catch (error) {
    console.error('Error in addToCartAction:', error);
    throw error;
  }
}
