const API_BASE = process.env.API;

/**
 * Safe typed API caller for server actions or client fetches.
 * Throws on any non-OK response.
 */
export async function callApi<T = any>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: any
): Promise<T> {
  const url = `${API_BASE}/api/v1/${path}`;
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    });

    const data = await res.json();

    if (!res.ok) {
      const message =
        data?.message || data?.error || `Request failed (${res.status} ${res.statusText})`;
      throw new Error(message);
    }

    return data as T;
  } catch (err: any) {
    throw new Error(err.message || 'Unexpected API error');
  }
}
