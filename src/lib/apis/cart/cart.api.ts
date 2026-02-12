import { CartItemFromHook } from '@/lib/types/cart';

export async function getCart(): Promise<CartItemFromHook[]> {
  try {
    console.log('Fetching cart from /api/cart...');
    // Call API route
    const res = await fetch('/api/cart', { cache: 'no-store' });

    console.log('Cart API response status:', res.status);

    // If unauthorized (401), return empty array (user not logged in)
    if (res.status === 401) {
      console.log('Unauthorized - returning empty cart');
      return [];
    }

    // Handle other errors
    if (!res.ok) {
      console.error('Cart API error:', res.status, res.statusText);
      throw new Error('Failed to fetch cart');
    }

    // Return cart data
    const data = await res.json();
    console.log('Cart data received:', data);
    console.log('Cart items count:', Array.isArray(data) ? data.length : 'not an array');
    return data;
  } catch (error) {
    // Log error for debugging
    console.error('Error fetching cart:', error);
    // Return empty array on error instead of throwing
    // This allows the UI to show empty cart state
    return [];
  }
}
