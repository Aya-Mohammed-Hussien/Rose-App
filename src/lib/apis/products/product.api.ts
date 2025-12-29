// src/lib/apis/product.api.ts
import { getToken } from '@/lib/utils/get-token.util';
import type { Product, ProductsMetadata } from '@/lib/types/product';

type ProductsApiRaw = {
  message: string;
  metadata?: ProductsMetadata;
  products?: Product[];
};

export async function getDashboardProducts(options?: {
  page?: number;
  limit?: number;
}): Promise<{ products: Product[]; metadata: ProductsMetadata }> {
  const api = process.env.API_URL;
  const token = await getToken();

  const page = options?.page ?? 1;
  const limit = options?.limit ?? 12;

  const res = await fetch(`${api}/products?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ['products'] },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data: ProductsApiRaw = await res.json();

  const products: Product[] = (data.products || []).map((p: Product) => ({
    ...p,
    quantity: typeof p.quantity === 'number' ? p.quantity : 0,
    sold: typeof p.sold === 'number' ? p.sold : 0,
    rateAvg: typeof p.rateAvg === 'number' ? p.rateAvg : 0,
    rateCount: typeof p.rateCount === 'number' ? p.rateCount : 0,
  }));

  const metadata: ProductsMetadata = data.metadata || {
    currentPage: page,
    totalPages: 1,
    limit,
    totalItems: products.length,
  };

  return { products, metadata };
}
