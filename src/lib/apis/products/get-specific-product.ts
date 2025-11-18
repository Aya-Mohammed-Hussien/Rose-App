// API Function: getProduct
// Fetches product details for a given product ID

import { getToken } from '@/lib/utils/get-token.util';

export async function getProduct(productId: string) {
  // --- Base API URL ---
  const baseUrl = process.env.NEXT_PUBLIC_API;

  // --- Get user token (for authorization) ---
  const token = await getToken();

  // --- Request product data from backend ---
  const res = await fetch(`${baseUrl}/products/${productId}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // --- Handle failed requests ---
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  // --- Parse and return product data ---
  const data = await res.json();
  return data;
}
