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
    });

    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to add item to cart' }));
      console.error('Failed to add to cart:', response.status, errorData);
      throw new Error(errorData.message || 'Failed to add item to cart');
    }

    const payload = await response.json();
    console.log('Add to cart success:', payload);
    return payload;
  } catch (error) {
    console.error('Error in addToCartAction:', error);
    throw error;
  }
}
