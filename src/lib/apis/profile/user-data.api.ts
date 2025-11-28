import { CategoriesResponse } from '@/lib/types/category';
import { getToken } from '@/lib/utils/get-token.util';

export const getCategoryById = async (categoryId: string): Promise<CategoriesResponse> => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Stop if no token is available
    if (!token) {
      throw new Error('No access token found');
    }

    // Send a GET request to the category API endpoint
    const response = await fetch(`${baseURL}/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    // Parse the server response
    const payload: CategoriesResponse = await response.json();

    // If the response status is not OK, throw an error with the server message
    if (!response.ok) {
      throw new Error(payload.message || 'Failed to fetch category');
    }

    // Return the server response
    return payload;
  } catch (error: any) {
    // Catch any unexpected errors and return a descriptive message
    throw new Error(error.message || 'Unexpected error while getting category');
  }
};
