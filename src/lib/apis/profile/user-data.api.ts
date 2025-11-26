import { GetUserResponse } from '@/lib/types/user-data';
import { getToken } from '@/lib/utils/get-token.util';

export const getUserData = async (): Promise<GetUserResponse> => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Stop if no token is available
    if (!token) {
      throw new Error('No access token found');
    }

    // Send a GET request to the "profile-data" API endpoint
    const response = await fetch(`${baseURL}/auth/profile-data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    // Parse the server response
    const payload: GetUserResponse = await response.json();

    // If the response status is not OK, throw an error with the server message
    if (!response.ok) {
      throw new Error(payload.message || 'failed to fetch user data');
    }

    // Return the server response
    return payload;
  } catch (error: any) {
    // Catch any unexpected errors and return a descriptive message
    throw new Error(error.message || 'Unexpected error while getting user data');
  }
};
