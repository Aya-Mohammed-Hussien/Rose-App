'use server';

import { getToken } from '@/lib/utils/get-token.util';
import { Occasion } from '@/lib/types/occasion';

export async function getOccasionById(
  id: string
): Promise<{ message: string; occasion: Occasion }> {
  try {
    const token = await getToken();
    const baseURL = process.env.API_URL;

    if (!token) throw new Error('Unauthorized: No token found');

    const res = await fetch(`${baseURL}/occasions/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) throw new Error(`API Error: ${res.status}`);

    return data as { message: string; occasion: Occasion };
  } catch (err) {
    throw err;
  }
}
