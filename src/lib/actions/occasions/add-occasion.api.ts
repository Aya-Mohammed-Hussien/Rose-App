'use server';

import { getToken } from '@/lib/utils/get-token.util';
import { revalidatePath } from 'next/cache';

export async function addOccasion(formData: FormData) {
  try {
    const token = await getToken();
    if (!token) {
      return { error: 'Session expired. Please login again.' };
    }

    const baseURL = process.env.API_URL;

    const res = await fetch(`${baseURL}/occasions`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json().catch(() => ({}));

    if (data.error || !res.ok) {
      const msg = data.message || data.error || 'Failed to add occasion.';
      if (String(msg).includes('E11000') || String(msg).includes('duplicate')) {
        return { error: 'Occasion name already exists. Please use a different name.' };
      }
      return { error: msg };
    }

    revalidatePath('/dashboard/occasions');
    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}
