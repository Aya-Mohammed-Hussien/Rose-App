import React from 'react';
import { getProducts } from '../../../lib/apis/products/product-list-filter';
import ProductCard from '@/components/features/product-card/product-card';
import PaginationSection from '@/components/features/pagination/pagination';
import WishlistButtonWrapper from '@/components/features/wishlist/wishlist-button-wrapper';

export default async function ProductsPage({
  searchParams = {},
}: {
  searchParams?: Record<string, any>;
}) {
  try {
    const data = await getProducts(searchParams);
    const products = data.products || [];
    const totalPages = data.metadata?.totalPages || 1;
    const currentPage = Number(searchParams.page) || 1;

    return (
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product: any) => (
              <div key={product._id} className="relative">
                <div className="absolute top-3 left-3 z-10">
                  <WishlistButtonWrapper productId={product._id} />
                </div>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>

        <div className="flex justify-center mt-10">
          <PaginationSection currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    );
  } catch (error: any) {
    return (
      <p className="text-center py-10 text-red-500">{error.message || 'Something went wrong'}</p>
    );
  }
}
