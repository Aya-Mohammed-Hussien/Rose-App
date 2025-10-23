import { ApiResponse } from '../../types/review';

export const getReviews = async (productId: string): Promise<ApiResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products/${productId}/reviews`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch reviews: ${res.statusText}`);
    }

    const data: ApiResponse = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Failed to fetch reviews');
  }
};
