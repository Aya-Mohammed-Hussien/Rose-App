import { Product } from '@/lib/types/product';

export interface ProductsByCategoryResponse {
  message: string;
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
  products: Product[];
}
