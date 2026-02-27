'use server';

import { getToken } from '@/lib/utils/get-token.util';
import { revalidatePath } from 'next/cache';

export async function DeleteProduct(productId: string) {
  try {
    // Token Check
    const token = await getToken();
    if (!token) {
      return { error: 'Session expired. Please login again.' };
    }

    const baseURL = process.env.API_URL;

    // Send Request
    const res = await fetch(`${baseURL}/products/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        error: errorData.message || errorData.error || 'Failed to delete product.',
      };
    }

    const data = await res.json().catch(() => ({ success: true }));

    if (data.error) {
      return { error: data.error };
    }

    // Revalidate the products page
    revalidatePath('/dashboard/products');

    return { success: true, message: 'Product deleted successfully' };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}
