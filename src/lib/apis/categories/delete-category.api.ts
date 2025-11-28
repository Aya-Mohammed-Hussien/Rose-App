'use server';

import { getToken } from '@/lib/utils/get-token.util';
import { revalidatePath } from 'next/cache';

export async function DeleteCategory(categoryId: string) {
  try {
    // Token Check
    const token = await getToken();
    if (!token) {
      return { error: 'Session expired. Please login again.' };
    }

    // Send Request
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        error: errorData.message || errorData.error || 'Failed to delete category.',
      };
    }

    const data = await res.json().catch(() => ({ success: true }));

    if (data.error) {
      return { error: data.error };
    }

    // Revalidate the categories page
    revalidatePath('/categories');

    return { success: true, message: 'Category deleted successfully' };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}
