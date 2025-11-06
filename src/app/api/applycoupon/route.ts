import { NextResponse } from 'next/server';
import { getToken } from '@/lib/utils/get-token.util';
import { JSON_HEADER } from '@/lib/constants/shared.constant';

export async function POST(req: Request) {
  try {
    const token = await getToken();
    if (!token) {
      return NextResponse.json({ message: 'You must be logged in.' }, { status: 401 });
    }

    const { code } = await req.json();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/coupons/apply`, {
      method: 'POST',
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Apply Coupon Error:', err);
    return NextResponse.json({ message: err.message || 'Failed to apply coupon' }, { status: 500 });
  }
}
