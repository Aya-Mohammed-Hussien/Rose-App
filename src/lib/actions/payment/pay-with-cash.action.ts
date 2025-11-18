'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { ShippingPayload } from '@/lib/types/address';
import { getToken } from '@/lib/utils/get-token.util';

export const payWithCash = async (shippingAddressPayload: ShippingPayload) => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Stop if no token is available
    if (!token) {
      throw new Error('No access token found');
    }

    // Send a POST request to the "orders" API endpoint
    const response = await fetch(`${baseURL}/orders`, {
      method: 'POST',
      body: JSON.stringify(shippingAddressPayload),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the server response
    const payload = await response.json();

    // If the response status is not OK, throw an error with the server message
    if (!response.ok) {
      throw new Error(payload.error || payload.message || 'failed to pay with cash');
    }

    // Return the server response
    return payload;
  } catch (error) {
    // Catch any unexpected errors and return a descriptive message
    throw error;
  }
};
