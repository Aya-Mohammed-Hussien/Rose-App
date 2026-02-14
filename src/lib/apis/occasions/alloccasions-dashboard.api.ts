import { OccasionsApiResponse } from '@/lib/types/occasion';
import { getToken } from '@/lib/utils/get-token.util';

export const getOccasions = async (page = 1, search = ''): Promise<OccasionsApiResponse> => {
  try {
    const token = await getToken();
    const baseURL = process.env.API_URL;

    if (!token) {
      throw new Error('No access token found');
    }

    const url = new URL(`${baseURL}/occasions`);
    url.searchParams.append('page', page.toString());
    if (search.trim()) {
      url.searchParams.append('search', search.trim());
    }

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const payload: OccasionsApiResponse = await response.json();

    if (!response.ok || 'error' in payload) {
      throw new Error('Failed to fetch occasions');
    }

    return payload;
  } catch (error) {
    throw error || 'Unexpected error while fetching occasions';
  }
};
