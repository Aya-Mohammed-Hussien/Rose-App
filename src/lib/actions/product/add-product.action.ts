'use server';

import { getToken } from '@/lib/utils/get-token.util';

export const addProductAction = async (formData: FormData) => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Send a POST request to the "add product" API endpoint
    const response = await fetch(`${process.env.API_URL}/products`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the server response
    const payload = await response.json();

    // If the response status is not OK, throw an error with the server message
    if (!response.ok) {
      throw new Error(payload.error || 'Something went wrong');
    }

    // Return the server response
    return payload;
  } catch (error) {
    // Catch any unexpected errors and return a descriptive message
    throw new Error(
      error instanceof Error ? error.message : 'Unexpected error while adding product'
    );
  }
};
