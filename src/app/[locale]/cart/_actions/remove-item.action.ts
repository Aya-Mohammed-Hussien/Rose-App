'use server';

// ===============================================================
// Functions
// Removes a specific item from the user's cart using its ID.
import { getToken } from '@/lib/utils/get-token';

export async function removeCartItemAction(itemId: string) {
  // --- Get token for authenticated request ---
  const token = await getToken();
  if (!token) throw new Error('Unauthorized');

  // --- Send DELETE request to remove item ---
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/cart/${itemId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // --- Handle errors ---
  if (!res.ok) throw new Error('Failed to remove item');

  // --- Return updated cart data ---
  return res.json();
}
