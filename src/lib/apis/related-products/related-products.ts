import { ProductsByCategoryResponse } from '@/lib/types/related-products';

export const getProductsByCategory = async (
  categoryId: string
): Promise<ProductsByCategoryResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products?category=${categoryId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data: ProductsByCategoryResponse = await res.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};
