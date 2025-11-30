'use server';

import { StatisticsResponse } from '@/lib/types/statistics';
import { getToken } from '@/lib/utils/get-token.util';

export async function getProductsStatistics(): Promise<StatisticsResponse> {
  try {
    const token = await getToken();

    if (!token) {
      console.error('❌ No token found in session');
      throw new Error('Unauthorized');
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/statistics/products`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    console.log('📡 Products Statistics Response status:', res.status);

    const data = await res.json().catch(() => null);
    console.log('📦 Products Statistics JSON:', data);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    return data as StatisticsResponse;
  } catch (err) {
    console.error('🔥 Products Statistics fetch error:', err);
    throw err;
  }
}
