import { ProductDetailsResponse } from '@/lib/types/product';

export const getProductDetails = async (productId: string): Promise<ProductDetailsResponse> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/products/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch Product Details');
    }
    const payload: ProductDetailsResponse = await response.json();
    return payload;
  } catch (error) {
    throw error;
  }
};
