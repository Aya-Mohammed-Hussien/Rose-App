'use server';

import { getToken } from '@/lib/utils/get-token.util';
import { cookies } from 'next/headers';

export const deleteAccount = async () => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Stop if no token is available
    if (!token) {
      throw new Error('No access token found');
    }

    // Send a DELETE request to the "deleteMe" API endpoint
    const response = await fetch(`${baseURL}/auth/deleteMe`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the server response
    const payload = await response.json();

    // If the response status is not OK, throw an error with the server message
    if (!response.ok) {
      throw new Error(payload.error || payload.message || 'Failed to delete account');
    }

    // On success, remove the session token (force re-login after password change)
    cookies().delete('next-auth.session-token');

    // Return the server response
    return payload;
  } catch (error) {
    // Catch any unexpected errors and return a descriptive message
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected error while deleting account'
    );
  }
};
