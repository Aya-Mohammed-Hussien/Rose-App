// lib/apis/occasions/occasion.api.ts
import { OccasionsApiResponse } from '@/lib/types/occasion';

// Fetch paginated occasions directly from external API (for server components)
export const getOccasions = async (page = 1, limit = 4): Promise<OccasionsApiResponse> => {
  try {
    // Get the external API URL from environment variables
    const apiUrl = process.env.NEXT_PUBLIC_API;

    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_API environment variable is not set');
    }

    // Fetch data directly from external API (no cache to ensure fresh results)
    const response = await fetch(`${apiUrl}/occasions?page=${page}&limit=${limit}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Throw error if request failed
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: 'Failed to fetch occasions' }));
      throw new Error(
        errorData.message || `Failed to fetch occasions: ${response.status} ${response.statusText}`
      );
    }

    // Return parsed JSON data
    return response.json();
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching occasions:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch occasions');
  }
};

// Fetch all occasions from the local API route
export const getAllOccasions = async () => {
  // Send GET request
  const response = await fetch(`/api/dashboard-occasions`);

  // Parse response into JSON
  const payload: OccasionsApiResponse = await response.json();

  // Handle unsuccessful response
  if (!response.ok) {
    throw new Error(payload.message || 'Failed to fetch occasions');
  }

  // Return data
  return payload;
};
