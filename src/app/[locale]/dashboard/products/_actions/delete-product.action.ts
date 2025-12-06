'use server';

import { getToken } from '@/lib/utils/get-token.util';
import { revalidateTag } from 'next/cache';

// Delete a product on the server
export const deleteProduct = async (productId: string) => {
  try {
    // Get auth token
    const token = await getToken();

    // Send DELETE request to API
    const res = await fetch(`${process.env.API_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = await res.json();

    // Throw error if request failed
    if (!res.ok) {
      throw new Error(payload?.error || 'Failed to delete product');
    }

    // Revalidate cached products data
    revalidateTag('products');

    return payload;
  } catch (error) {
    // Handle unexpected errors
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected error while deleting product'
    );
  }
};
