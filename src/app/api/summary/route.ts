import { NextResponse } from 'next/server';
import { getToken } from '@/lib/utils/get-token.util';

export async function GET() {
  try {
    const token = await getToken();

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized: no token found' }, { status: 401 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Cart API Error:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const payload = await response.json();

    return NextResponse.json(payload);
  } catch (error) {
    console.error('❌ Error fetching cart:', error);
    return NextResponse.json({ message: 'Failed to load cart data' }, { status: 500 });
  }
}
