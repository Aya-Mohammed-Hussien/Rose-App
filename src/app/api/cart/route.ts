export const dynamic = 'force-dynamic';

// ===============================================================
// Route Handler (GET)
// Fetches the authenticated user's cart data from the API and returns a simplified response.

import { NextResponse } from 'next/server';
import { getToken } from '@/lib/utils/get-token.util';
import { CartItemFromHook } from '@/lib/types/cart';
import { CartItem } from '@/lib/types/cart.api';

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
    const data = await res.json();

    // --- Validate and transform API data into frontend-friendly format ---
    // The API returns: { message, numOfCartItems, cart: { cartItems: [...] } }
    const cartItemsData = data?.cart?.cartItems || [];

    if (!Array.isArray(cartItemsData)) {
      console.error('Cart items is not an array:', cartItemsData);
      return NextResponse.json([]);
    }

    const cartItems: CartItemFromHook[] = cartItemsData
      .filter((item: CartItem) => {
        // Filter out items without product
        if (!item?.product) {
          console.warn('Cart item missing product:', item);
          return false;
        }
        return true;
      })
      .map((item: CartItem) => {
        const product = item.product;
        const cartItem: CartItemFromHook = {
          id: product?._id || '',
          name: product?.title || 'Unknown Product',
          image: product?.imgCover || '',
          rating: product?.rateAvg || 0,
          reviewsCount: product?.rateCount || 0,
          price: item.price || 0,
          quantity: item.quantity || 1,
        };

        return cartItem;
      })
      .filter((item: CartItemFromHook) => item.id && item.name); // Filter out invalid items

    // --- Return simplified cart items ---
    return NextResponse.json(cartItems);
  } catch (err) {
    // --- Handle unexpected errors ---
    console.error('Error in cart API route:', err);
    // Return empty array instead of error to allow UI to show empty state
    return NextResponse.json([]);
  }
}
