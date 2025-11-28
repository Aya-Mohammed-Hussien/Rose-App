'use server';

import { DuplicateErrorResponse } from '@/lib/types/add-category';
import { getToken } from '@/lib/utils/get-token.util';

export async function addCategory(formData: FormData) {
  try {
    // Token Check
    const token = await getToken();
    if (!token) {
      return { error: 'Session expired. Please login again.' };
    }

    // Send Request
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data: DuplicateErrorResponse = await res.json();

    if (data.error) {
      if (data.error.includes('E11000') || data.error.includes('duplicate key')) {
        return { error: 'Category name already exists. Please use a different name.' };
      }
    }

    return data;
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}
