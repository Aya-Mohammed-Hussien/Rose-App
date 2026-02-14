import { RelatedProductsResponse } from '@/lib/types/related-products';

export const getProductsByCategory = async (
  categoryId: string
): Promise<RelatedProductsResponse> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/related/category/${categoryId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    const data: RelatedProductsResponse = await res.json();
    return data;
  } catch (error: unknown) {
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch products');
  }
};
