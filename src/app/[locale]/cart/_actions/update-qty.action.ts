'use server';

// ===============================================================
// Functions
// Handles updating a cart item's quantity on the server.
// Requires user authentication via token.
import { getToken } from '@/lib/utils/get-token.util';
import { revalidateTag } from 'next/cache';

export async function updateCartItemQtyAction({ id, quantity }: { id: string; quantity: number }) {
  // --- Get token for authenticated request ---
  const token = await getToken();
  if (!token) throw new Error('Unauthorized');
  console.log('id,quantity', id, quantity);

  // --- Send PUT request to update quantity ---
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/cart/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  // --- Handle errors ---
  if (!res.ok) throw new Error('Failed to update quantity');

  // --- Return updated cart data ---
  const payload = await res.json();

  // Revalidate cached cart so any summaries and cart views update
  revalidateTag('cart');

  return payload;
}
