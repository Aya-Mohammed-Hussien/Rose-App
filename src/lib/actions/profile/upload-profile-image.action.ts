'use server';

import { getToken } from '@/lib/utils/get-token.util';

export const uploadProfileImage = async (formData: FormData) => {
  try {
    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Retrieve the access token from cookies
    const token = await getToken();

    // Stop if no token is available
    if (!token) {
      throw new Error('No access token found');
    }

    // Send a PUT request to the "upload-photo" API endpoint
    const response = await fetch(`${baseURL}/auth/upload-photo`, {
      method: 'PUT',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the server response
    const payload = await response.json();

    // If the response status is not OK, throw an error with the server message
    if (!response.ok) {
      throw new Error(payload.error || 'Failed to upload image');
    }

    // Return the server response
    return payload;
  } catch (error) {
    // Catch any unexpected errors and return a descriptive message
    throw error;
  }
};
