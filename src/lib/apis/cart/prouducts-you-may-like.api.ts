// API Function: getRecommendedProducts
// Fetches product recommendations for a given user ID

import { getToken } from '@/lib/utils/get-token.util';

export async function getRecommendedProducts(userId: string) {
  // --- Base API URL ---
  const baseUrl = process.env.NEXT_PUBLIC_API;

  // --- Get user token (for authorization) ---
  const token = await getToken();

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
    throw new Error('Failed to fetch recommended products');
  }

  // --- Parse and return recommendations ---
  const data = await res.json();
  return data.recommendations;
}
