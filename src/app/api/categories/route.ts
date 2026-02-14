import { CategoriesResponse } from '@/lib/types/category';
import { NextResponse } from 'next/server';

export const GET = async (request: Request) => {
  try {
    //  Extract query parameters from the incoming request URL
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';

    // Base API URL
    const baseURL = process.env.NEXT_PUBLIC_API;

    // Send request to API endpoint
    const response = await fetch(`${baseURL}/categories?page=${page}&limit=7`);

    // Handle failed response
    if (!response.ok) {
      return NextResponse.json(
        { message: `Failed to fetch categories: ${response.statusText}` },
        { status: response.status }
      );
    }

    // Turn response into JSON
    const payload: CategoriesResponse = await response.json();

    // Return data
    return NextResponse.json(payload);
  } catch (error) {
    // Handle unexpected errors
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
};
