import { OverallStatisticsResponse } from '@/lib/types/statistics';
import { getToken } from '@/lib/utils/get-token.util';

/**
 * Fetch overall statistics from the backend API.
 * This function retrieves the user token using getToken() and
 * sends it as a Bearer token in the Authorization header.
 */

export const getOverallStatistics = async (): Promise<OverallStatisticsResponse> => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(`${process.env.API_URL}/statistics/overall`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Session expired or invalid. Please log in again.');
      }
      throw new Error(`Failed to get overall statistics: ${response.status}`);
    }

    const payload: OverallStatisticsResponse = await response.json();
    return payload;
  } catch (error) {
    throw error;
  }
};
