'use server';

import { JSON_HEADER } from '@/lib/constants/shared.constant';
import { AddToWishlistPayload, WishlistResponse } from '@/lib/types/wishlist';
import { getToken } from '@/lib/utils/get-token.util';

export const addToWishlist = async (productId: AddToWishlistPayload): Promise<WishlistResponse> => {
  try {
    const token = await getToken();
    if (!token) {
      throw new Error('No access token found');
    }
    const baseURL = process.env.NEXT_PUBLIC_API;
    const response = await fetch(`${baseURL}/wishlist`, {
      method: 'POST',
      body: JSON.stringify(productId),
      headers: {
        ...JSON_HEADER,
        Authorization: `Bearer ${token}`,
      },
    });
    const payload: WishlistResponse = await response.json();

    if (!response.ok) {
      throw new Error(payload.message);
    }
    return payload as WishlistResponse;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Something went wrong!');
  }
};
