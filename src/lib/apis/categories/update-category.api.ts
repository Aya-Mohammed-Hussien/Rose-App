'use server';

import { CategoryData, UpdateCategoryResponse } from '@/lib/types/add-category';
import { getToken } from '@/lib/utils/get-token.util';
import { revalidatePath } from 'next/cache';

interface UpdateCategoryError {
  error: string;
}

interface UpdateCategorySuccess {
  success: true;
  message: string;
  category: CategoryData;
}

interface UpdateCategoryFailure {
  success?: false;
  error: string;
}

export type UpdateCategoryResult = UpdateCategorySuccess | UpdateCategoryFailure;

export async function updateCategory(
  categoryId: string,
  formData: FormData
): Promise<UpdateCategoryResult> {
  try {
    const token = await getToken();
    if (!token) {
      return { error: 'Session expired. Please login again.' };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories/${categoryId}`, {
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

    revalidatePath('/categories');

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
