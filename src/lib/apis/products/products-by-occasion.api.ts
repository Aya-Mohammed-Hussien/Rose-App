import { ProductsByOccasionResponse } from '@/lib/types/product';

export const getProductsByOccasion = async (
  occasionId: string
): Promise<ProductsByOccasionResponse> => {
  try {
    const response = await fetch(
      `https://flower.elevateegy.com/api/v1/products?occasion=${occasionId}&limit=12`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const payload: ProductsByOccasionResponse = await response.json();
    return payload;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};
