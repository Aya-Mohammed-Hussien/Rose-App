import { AddressesResponse } from '@/lib/types/addresses';
import { getToken } from '@/lib/utils/get-token.util';
import { NextResponse } from 'next/server';

// Handle GET requests for fetching addresses
export async function GET() {
  try {
    // Get the user's token
    const token = await getToken();

    // Call the backend with the token
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/addresses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    // Throw an error if the request failed
    if (!response.ok) throw new Error('Failed to fetch user Addresses');

    // Return fetched data as JSON
    const payload: AddressesResponse = await response.json();
    return NextResponse.json(payload);
    
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return NextResponse.json(
      {
        error: 'Failed to load addresses',
      },
      { status: 500 }
    );
  }
}
