import { GetOrderStatisticsResponse } from '@/lib/types/order-statistics';
import { getToken } from '@/lib/utils/get-token.util';

export const getOrderStatistics = async (): Promise<GetOrderStatisticsResponse> => {
  try {
    // Retrieve the access token from cookies
    const token = await getToken();

    // Get the base API URL from environment variables
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Stop if no token is available
    if (!token) {
      throw new Error('No access token found');
    }

    // Send a GET request to the "statistics" API endpoint
    const response = await fetch(`${baseURL}/addresses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Parse the server response
    const payload: GetOrderStatisticsResponse = await response.json();

    // If the response status is not OK, throw an error with the server message
    if (!response.ok || 'error' in payload) {
      throw new Error('failed to fetch addresses');
    }

    // Return the server response
    return payload;
  } catch (error) {
    // Catch any unexpected errors and return a descriptive message
    throw error || 'Unexpected error while getting addresses';
  }
};
