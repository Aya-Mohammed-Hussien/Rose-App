'use server';

import { getToken } from '@/lib/utils/get-token.util';
import { revalidatePath } from 'next/cache';

export type UpdateOccasionResult =
  | { success: true; message: string; occasion?: unknown }
  | { error: string };

export async function updateOccasion(
  occasionId: string,
  formData: FormData
): Promise<UpdateOccasionResult> {
  try {
    const token = await getToken();
    if (!token) {
      return { error: 'Session expired. Please login again.' };
    }

    const baseURL = process.env.API_URL;

    const res = await fetch(`${baseURL}/occasions/${occasionId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json().catch(() => ({}));

    if (data.error || !res.ok) {
      const msg = data.message || data.error || 'Failed to update occasion.';
      if (String(msg).includes('E11000') || String(msg).includes('duplicate')) {
        return { error: 'Occasion name already exists. Please use a different name.' };
      }
      return { error: msg };
    }

    revalidatePath('/dashboard/occasions');
    return { success: true, message: data.message ?? 'Occasion updated successfully', occasion: data.occasion };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}
