import { GetWishlistResponse } from '@/lib/types/wishlist';

export const getWishlistProducts = async (): Promise<GetWishlistResponse> => {
  try {
    const response = await fetch(`/api/wishlist`, {
      credentials: 'include',
    });

    const payload: GetWishlistResponse = await response.json();

    if (!response.ok) {
      throw new Error(payload.message || 'Failed to fetch wishlist');
    }
    return payload;
  } catch (error: any) {
    throw new Error(error.message || 'Something went wrong while fetching wishlist');
  }
};
