'use server';

import { getToken } from "@/lib/utils/get-token.util";

// Functions
// Clears all items from the user's cart.

const API = process.env.NEXT_PUBLIC_API;
export async function clearCartAction() {
  // --- Get auth token from cookies or session ---
  const token = await getToken();
  if (!token) throw new Error('Not authenticated');

  // --- Send DELETE request to clear cart ---
  const res = await fetch(`${API}/cart`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  // --- Handle possible errors ---
  if (!res.ok) {
    let message = 'Failed to clear cart';
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      throw new Error(message);
    }
  }
}
