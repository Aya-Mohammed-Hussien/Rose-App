import { getSession } from 'next-auth/react';

const API_URL = 'https://flower.elevateegy.com/api/v1/wishlist';

async function getAuthToken() {
  const session = await getSession();

  const token =
    (session as any)?.token || (session as any)?.user?.token || (session as any)?.user?.accessToken;

  return token;
}

//  GET Wishlist
export async function getWishlist() {
  const token = await getAuthToken();
  if (!token) throw new Error('User not authenticated');

  const res = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch wishlist (${res.status})`);
  }

  return await res.json();
}

//  ADD
export async function addToWishlist(productId: string) {
  const token = await getAuthToken();
  if (!token) throw new Error('User not authenticated');

  const res = await fetch(`${API_URL}/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    throw new Error(`Failed to add to wishlist (${res.status})`);
  }

  return await res.json();
}

//  DELETE
export async function removeFromWishlist(productId: string) {
  const token = await getAuthToken();
  if (!token) throw new Error('User not authenticated');

  const res = await fetch(`${API_URL}/${productId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to remove from wishlist (${res.status})`);
  }

  return await res.json();
}
