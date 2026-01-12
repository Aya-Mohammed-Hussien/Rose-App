import { getCartResponse } from '@/lib/types/cart.api';
import { getToken } from '@/lib/utils/get-token.util';

export const getCart = async (): Promise<getCartResponse> => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    if (!baseURL) {
      throw new Error('NEXT_PUBLIC_API environment variable is not set');
    }

    // Stop if no token is available
    if (!token) {
      throw new Error('No access token found. Please log in again.');
    }

    // Send a GET request to the "cart" API endpoint
    const response = await fetch(`${baseURL}/cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    // Handle network errors
    if (!response.ok) {
      let errorMessage = `Failed to fetch cart: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use the status text
      }
      throw new Error(errorMessage);
    }

    // Parse the server response
    const payload: getCartResponse = await response.json();

    // If the response contains an error, throw
    if ('error' in payload) {
      throw new Error((payload.error as string) || 'Failed to fetch cart');
    }

    // Return the server response
    return payload;
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching cart:', error);
    throw error instanceof Error ? error : new Error('Unexpected error while getting cart');
  }
};
