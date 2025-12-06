// /app/api/categories/route.ts (Next.js 13+)
import { NextResponse } from 'next/server';
import { CategoriesResponse } from '@/lib/types/category';

export async function GET() {
  try {
    const response = await fetch(`${process.env.API_URL}/categories`);
    const data: CategoriesResponse = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Failed to fetch categories' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
