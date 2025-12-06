import { OverallStatisticsResponse } from '@/lib/types/statistics';
import { getToken } from '@/lib/utils/get-token.util';

/**
 * Fetch overall statistics from the backend API.
 * This function retrieves the user token using getToken() and
 * sends it as a Bearer token in the Authorization header.
 */

export const getOverallStatistics = async (): Promise<OverallStatisticsResponse> => {
  try {
    // Retrieve the JWT token from cookies
    const token = await getToken();

    // Send a GET request to the /categories endpoint
    const response = await fetch(`${process.env.API_URL}/statistics/overall`, {
      method: 'GET',
      headers: {
        // Include the token in the Authorization header
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response status is not OK (e.g., 401)
    if (!response.ok) {
      throw new Error(`Failed to get categories statistics: ${response.status}`);
    }

    // Parse the response body as JSON
    const payload: OverallStatisticsResponse = await response.json();

    // Return the parsed data
    return payload;
  } catch (error) {
    // Rethrow the error so it can be handled in the calling code
    throw error;
  }
};
