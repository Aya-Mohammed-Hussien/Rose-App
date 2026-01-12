import { NextResponse } from 'next/server';
import { getToken } from '@/lib/utils/get-token.util';
import { GetWishlistResponse } from '@/lib/types/wishlist';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    // Variables
    const token = await getToken();
    // Base API URL
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Check if there is token
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Send request to API endpoint
    const response = await fetch(`${baseURL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Turn response into JSON
    const payload: GetWishlistResponse = await response.json();

    //  Handle failed response
    if (!response.ok) {
      return NextResponse.json(
        { message: payload.message || 'Failed to fetch wishlist' },
        { status: response.status }
      );
    }

    // Return data
    return NextResponse.json(payload, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      // Handle unexpected errors
      { message: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
};
