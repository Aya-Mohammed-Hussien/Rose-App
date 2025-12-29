'use server';

import { getToken } from '@/lib/utils/get-token.util';

export async function addOccasion(form: FormData | { name: string; image?: File }) {
  try {
    const token = await getToken();
    const baseURL = process.env.API_URL;
    if (!token) throw new Error('No access token found');

    //  FormData
    const body = form instanceof FormData ? form : new FormData();

    if (!(form instanceof FormData)) {
      body.append('name', form.name);
      if (form.image) body.append('image', form.image);
    }

    const url = `${baseURL}/occasions`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    const text = await response.text();
    const contentType = response.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      throw new Error(`Non-JSON API response (status ${response.status}).`);
    }

    const data = JSON.parse(text);

    if (!response.ok) {
      throw new Error(data.message || `Failed to add occasion (status ${response.status})`);
    }

    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Something went wrong');
  }
}
