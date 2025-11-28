import { CategoriesResponse } from '@/lib/types/category';
import { redirect } from 'next/navigation';

export const getAllCategories = async (page: number = 1) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/categories?page=${page}`, {
      method: 'GET',
      cache: 'no-store',
    });

    // If response status is not OK.
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    // Parse the server response
    const payload: CategoriesResponse = await res.json();

    // If current page is empty and it's not the first page, redirect to previous page
    if (payload.categories.length === 0 && page > 1) {
      redirect(`/dashbaord/categories?page=${page - 1}`);
    }

    // Return response
    return payload;
  } catch (error) {
    // Catch Error
    throw error || 'Unexpected error while fetch Product Categories';
  }
};
