'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { profileValues } from '@/lib/schemes/profile.schema';
import { GetUserResponse } from '@/lib/types/user-data';
import { getToken } from '@/lib/utils/get-token.util';

export const editProfile = async (
  userData: Omit<profileValues, 'gender'>
): Promise<GetUserResponse> => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Stop if no token is available
    if (!token) {
      throw new Error('No access token found');
    }

    // Send a PUT request to the "editProfile" API endpoint
    const response = await fetch(`${baseURL}/auth/editProfile`, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    // Parse the server response
    const payload: GetUserResponse = await response.json();

    // If the response status is not OK, throw an error with the server message
    if (!response.ok) {
      throw new Error(payload.message || 'failed to edit profile');
    }

    // Return the server response
    return payload;
  } catch (error: unknown) {
    // Catch any unexpected errors and return a descriptive message
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected error while editing profile'
    );
  }
};
