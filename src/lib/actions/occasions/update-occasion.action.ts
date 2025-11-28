'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function updateOccasion(id: string, form: FormData) {
  try {
    const token = await getToken();
    const baseURL = process.env.API_URL;
    if (!token) throw new Error('No access token found');

    const url = `${baseURL}/occasions/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      throw new Error(`Non JSON response (status ${response.status})`);
    }

    const data = JSON.parse(text);

    if (!response.ok) {
      throw new Error(data.message || `Failed to update occasion (status ${response.status})`);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong');
  }
}
