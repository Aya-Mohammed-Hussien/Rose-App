import { CategoriesResponse } from '@/lib/types/category';

// Fetch function to get paginated categories
export const getCategories = async (page: number = 1): Promise<CategoriesResponse> => {
  try {
    // Send GET request
    const response = await fetch(`/api/categories?page=${page}&limit=7`);

    // Parse response into JSON
    const payload: CategoriesResponse = await response.json();

    // Handle unsuccessful response
    if (!response.ok) {
      throw new Error(payload.message || 'Failed to fetch categories');
    }

    // Return data
    return payload;
  } catch (error) {
    // Catching error
    throw error;
  }
};
