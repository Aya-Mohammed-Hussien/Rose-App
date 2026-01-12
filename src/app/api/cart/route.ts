// ===============================================================
// Route Handler (GET)
// Fetches the authenticated user's cart data from the API and returns a simplified response.

import { NextResponse } from 'next/server';
import { getToken } from '@/lib/utils/get-token.util';
import { CartResponse, CartItemFromHook } from '@/lib/types/cart';

export const dynamic = 'force-dynamic';

// ===============================================================
// Functions
export async function GET() {
  try {
    // --- Get auth token from cookies or session ---
    const token = await getToken();

    // If no token, return empty array (user not logged in)
    if (!token) {
      return NextResponse.json([]);
    }

    // --- Fetch cart data from external API ---
    const apiUrl = process.env.NEXT_PUBLIC_API;
    if (!apiUrl) {
      console.error('NEXT_PUBLIC_API environment variable is not set');
      return NextResponse.json([]);
    }

    const res = await fetch(`${apiUrl}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    // --- Handle failed response ---
    if (!res.ok) {
      // If unauthorized, return empty array
      if (res.status === 401) {
        return NextResponse.json([]);
      }
      // For other errors, log and return empty array
      console.error('Failed to fetch cart from external API:', res.status, res.statusText);
      return NextResponse.json([]);
    }

    // --- Parse response JSON ---
    const data: CartResponse = await res.json();

    // --- Transform API data into frontend-friendly format ---
    const cartItems: CartItemFromHook[] =
      data?.cart?.cartItems?.map((item) => ({
        id: item.product._id,
        name: item.product.title,
        image: item.product.imgCover,
        rating: item.product.rateAvg || 0,
        reviewsCount: item.product.rateCount || 0,
        price: item.price,
        quantity: item.quantity,
      })) || [];

    // --- Return simplified cart items ---
    return NextResponse.json(cartItems);
  } catch (err) {
    // --- Handle unexpected errors ---
    console.error('Error in cart API route:', err);
    // Return empty array instead of error to allow UI to show empty state
    return NextResponse.json([]);
  }
}
