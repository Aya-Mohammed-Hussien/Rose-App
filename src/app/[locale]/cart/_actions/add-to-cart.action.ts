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
    // Get token
    const token = await getToken();
    if (!token) {
      throw new Error('No access token found. Please log in again.');
    }

    // Get API URL
    const apiUrl = process.env.NEXT_PUBLIC_API;
    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_API environment variable is not set');
    }

    // Send POST request
    const response = await fetch(`${apiUrl}/cart`, {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      cache: 'no-store',
    });

    // Parse response
    const payload = await response.json();

    // Check if request failed
    if (!response.ok) {
      const errorMessage = payload?.message || payload?.error || 'Failed to add item to cart';
      throw new Error(errorMessage);
    }

    // Return success response
    return payload;
  } catch (error) {
    // Re-throw with proper error message
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unexpected error while adding item to cart');
  }
}
