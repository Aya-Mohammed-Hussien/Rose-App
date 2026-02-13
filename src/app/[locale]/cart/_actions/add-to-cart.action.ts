'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { getToken } from '@/lib/utils/get-token.util';
import { revalidateTag } from 'next/cache';

// Props
export type AddToCartData = {
  product: string;
  quantity: number;
};

export async function addToCartAction(data: AddToCartData) {
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
  });

  // Check if request failed before parsing
  if (!response.ok) {
    let errorMessage = `Failed to add item to cart (${response.status})`;
    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorData?.error || errorMessage;
    } catch {
      // If response is not JSON, use status text
      errorMessage = response.statusText || errorMessage;
    }
    throw new Error(errorMessage);
  }

  // Parse response only if OK
  try {
    const payload = await response.json();

    // Revalidate cached cart so summary and other server components update
    revalidateTag('cart');

    return payload;
  } catch {
    // If response is empty or not JSON, still revalidate and return success
    revalidateTag('cart');
    // Some APIs return 200 with empty body
    return { success: true };
  }
}
