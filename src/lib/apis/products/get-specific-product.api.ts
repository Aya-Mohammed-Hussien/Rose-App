import { getProduct } from './get-specific-product';

// Get specific product with error shape (like getSpecificCategory)
export async function getSpecificProduct(productId: string) {
  try {
    const data = await getProduct(productId);
    return data;
  } catch (err) {
    return {
      product: undefined,
      error: err instanceof Error ? err.message : 'Failed to fetch product',
    };
  }
}
