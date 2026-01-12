import { getAddressesResponse } from '@/lib/types/address';
import { getToken } from '@/lib/utils/get-token.util';

export const getAddresses = async (): Promise<getAddressesResponse> => {
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

    // Send a GET request to the "addresses" API endpoint
    const response = await fetch(`${baseURL}/addresses`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    // Handle network errors
    if (!response.ok) {
      let errorMessage = `Failed to fetch addresses: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use the status text
      }
      throw new Error(errorMessage);
    }

    // Parse the server response
    const payload: getAddressesResponse = await response.json();

    // If the response contains an error, throw
    if ('error' in payload) {
      throw new Error((payload.error as string) || 'Failed to fetch addresses');
    }

    // Return the server response
    return payload;
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching addresses:', error);
    throw error instanceof Error ? error : new Error('Unexpected error while getting addresses');
  }
};
