import { NextResponse } from 'next/server';
import { getToken } from '@/lib/utils/get-token.util';
import { JSON_HEADER } from '@/lib/constants/shared.constant';

export async function POST(req: Request) {
  try {
    // Get the user's token
    const token = await getToken();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized. Please login first.' }, { status: 401 });
    }

    const body = await req.json();
    // Call the backend with the token
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/orders/checkout?url=http://localhost:3000`,
      {
        method: 'POST',
        headers: {
          ...JSON_HEADER,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    // Throw an error if the request failed
    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || 'Failed to create Stripe session' },
        { status: response.status }
      );
    }

    // failitate redirect to Stripe Checkout
    return NextResponse.json(data);
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while creating Stripe session.' },
      { status: 500 }
    );
  }
}
