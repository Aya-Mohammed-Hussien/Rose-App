// API Function: getRecommendedProducts
// Fetches product recommendations for a given user ID

import { getToken } from '@/lib/utils/get-token.util';

export async function getRecommendedProducts(userId: string) {
  try {
    // --- Base API URL ---
    const baseUrl = process.env.NEXT_PUBLIC_API;

    if (!baseUrl) {
      throw new Error('NEXT_PUBLIC_API environment variable is not set');
    }

    // --- Get user token (for authorization) ---
    const token = await getToken();

    if (!token) {
      throw new Error('No access token found. Please log in again.');
    }

    // --- Request recommended products from backend ---
    const res = await fetch(`${baseUrl}/related/recommendations/${userId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // --- Handle failed requests ---
    if (!res.ok) {
      let errorMessage = `Failed to fetch recommended products: ${res.status} ${res.statusText}`;
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use the status text
      }
      throw new Error(errorMessage);
    }

    // --- Parse and return recommendations ---
    const data = await res.json();
    return data.recommendations || [];
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching recommended products:', error);
    throw error instanceof Error ? error : new Error('Failed to fetch recommended products');
  }
}
