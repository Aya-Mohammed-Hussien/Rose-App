'use server';

import { UpdateCategoryResponse } from '@/lib/types/add-category';
import { UpdateCategoryError, UpdateCategoryResult } from '@/lib/types/update-category';
import { getToken } from '@/lib/utils/get-token.util';
import { revalidateTag } from 'next/cache';

export async function updateCategory(
  categoryId: string,
  formData: FormData
): Promise<UpdateCategoryResult> {
  try {
    const token = await getToken();
    if (!token) {
      return { error: 'Session expired. Please login again.' };
    }

    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    const res = await fetch(`${baseURL}/categories/${categoryId}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data: UpdateCategoryResponse | UpdateCategoryError = await res.json();

    if (
      'error' in data &&
      (data.error.includes('E11000') || data.error.includes('duplicate key'))
    ) {
      return { error: 'Category name already exists. Please use a different name.' };
    }

    if ('error' in data) {
      return { error: data.error };
    }

    revalidateTag('category');

    return {
      success: true,
      message: data.message,
      category: data.category,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network error. Please try again.',
    };
  }
}
