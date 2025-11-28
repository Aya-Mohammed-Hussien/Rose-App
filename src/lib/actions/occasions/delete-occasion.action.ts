'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function deleteOccasion(id: string) {
  const token = await getToken();
  const baseURL = process.env.API_URL;
  if (!token) throw new Error('No access token');

  const res = await fetch(`${baseURL}/occasions/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) throw new Error(`Failed with status ${res.status}`);

  return await res.json();
}
