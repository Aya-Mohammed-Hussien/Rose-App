// ===============================================================
// Route Handler (GET)
// Fetches the authenticated user's cart data from the API and returns a simplified response.

import { NextResponse } from 'next/server';
import { getToken } from '@/lib/utils/get-token';
import { CartResponse, CartItemFromHook } from '@/lib/types/cart';

// ===============================================================
// Functions
export async function GET() {
  try {
    // --- Get auth token from cookies or session ---
    const token = await getToken();
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    // --- Fetch cart data from external API ---
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    // --- Handle failed response ---
    if (!res.ok)
      return NextResponse.json({ message: 'Failed to fetch cart' }, { status: res.status });

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
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
