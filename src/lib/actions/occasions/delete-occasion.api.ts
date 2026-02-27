'use server';

import { getToken } from '@/lib/utils/get-token.util';
import { revalidatePath } from 'next/cache';

export async function DeleteOccasion(occasionId: string) {
  try {
    const token = await getToken();
    if (!token) {
      return { error: 'Session expired. Please login again.' };
    }

    const baseURL = process.env.API_URL;

    const res = await fetch(`${baseURL}/occasions/${occasionId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        error: errorData.message || errorData.error || 'Failed to delete occasion.',
      };
    }

    const data = await res.json().catch(() => ({ success: true }));

    if (data.error) {
      return { error: data.error };
    }

    revalidatePath('/dashboard/occasions');

    return { success: true, message: 'Occasion deleted successfully' };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}
