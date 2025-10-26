// lib/apis/occasions/occasion.api.ts
import { OccasionsApiResponse } from '@/lib/types/occasion';

// Fetch paginated occasions from the local API route
export const getOccasions = async (page = 1, limit = 4): Promise<OccasionsApiResponse> => {
  // Build request URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const url = `${baseUrl}/api/occasions?page=${page}&limit=${limit}`;

  // Fetch data (no cache to ensure fresh results)
  const response = await fetch(url, { cache: 'no-store' });

  // Throw error if request failed
  if (!response.ok) {
    throw new Error('Failed to fetch occasions');
  }

  // Return parsed JSON data
  return response.json();
};
