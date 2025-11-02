'use server';

import { WishlistResponse } from '@/lib/types/wishlist';
import { getToken } from '@/lib/utils/get-token.util';

export const deleteFromWishlist = async (productId: string): Promise<WishlistResponse> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No access token found');
    }
    const baseURL = process.env.NEXT_PUBLIC_API;
    const response = await fetch(`${baseURL}/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const payload: WishlistResponse = await response.json();

    if (!response.ok) {
      throw new Error(payload.message);
    }
    return payload as WishlistResponse;
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong!');
  }
};
