import { GetUserResponse } from '@/lib/types/user-data';
import { getToken } from '@/lib/utils/get-token.util';

export const getUserData = async (): Promise<GetUserResponse> => {
  try {
    // Get token from cookies
    const token = await getToken();

    // Base API URL
    const baseURL = process.env.NEXT_PUBLIC_API;

    if (!baseURL) {
      throw new Error('NEXT_PUBLIC_API environment variable is not set');
    }

    if (!token) {
      throw new Error('No access token found. Please log in again.');
    }

    // Fetch user profile data
    const response = await fetch(`${baseURL}/auth/profile-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    // Handle network errors
    if (!response.ok) {
      let errorMessage = `Failed to fetch user data: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use the status text
      }
      throw new Error(errorMessage);
    }

    // Parse response
    const payload: GetUserResponse = await response.json();

    return payload;
  } catch (error: unknown) {
    // Log error for debugging
    console.error('Error fetching user data:', error);
    throw error instanceof Error ? error : new Error('Unexpected error while getting user data');
  }
};
