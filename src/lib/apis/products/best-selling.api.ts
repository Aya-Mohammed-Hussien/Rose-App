import { ProductsByOccasionResponse } from '@/lib/types/product';

export const getBestSellingProducts = async (): Promise<ProductsByOccasionResponse> => {
  try {
    const response = await fetch('https://flower.elevateegy.com/api/v1/products?limit=6');
    if (!response.ok) {
      throw new Error('failed to fetch Best Selling Products');
    }
    const payload: ProductsByOccasionResponse = await response.json();
    return payload;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch Best Selling Products');
  }
};
