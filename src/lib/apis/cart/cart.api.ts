import { getCartResponse } from '@/lib/types/cart.api';
import { getToken } from '@/lib/utils/get-token.util';

export async function getCart() {
  // Call API route
  const res = await fetch('/api/cart', { cache: 'no-store' });

  // Handle errors
  if (!res.ok) throw new Error('Failed to fetch cart');

  // Return cart data
  return res.json();
}
