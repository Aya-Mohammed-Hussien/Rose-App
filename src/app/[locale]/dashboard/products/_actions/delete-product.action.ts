'use server';

import { getToken } from '@/lib/utils/get-token.util';
import { revalidateTag } from 'next/cache';

export const deleteProduct = async (productId: string) => {
  try {
    const token = await getToken();

    const res = await fetch(`${process.env.API_URL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const payload = await res.json();

    if (!res.ok) {
      throw new Error(payload?.error || 'Failed to delete product');
    }

    revalidateTag('products');

    return payload;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected error while deleting product'
    );
  }
};
