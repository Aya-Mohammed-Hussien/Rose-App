'use client';

import ProductCard from '@/components/features/product-card/product-card';
import { useRouter, useSearchParams } from 'next/navigation';
import PaginationSection from '@/components/features/pagination/pagination';
import { ProductsByOccasionResponse } from '@/lib/types/product';

type Props = {
  productsData: ProductsByOccasionResponse;
};

const PRODUCT_LIMIT_PER_PAGE = 12;

export default function Products({ productsData }: Props) {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  // Variables
  const { products, metadata } = productsData;
  const { currentPage, totalPages: apiTotalPages } = metadata;
  const productsOnThisPage = products.length;

  // Functions
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  // Calculate the *real* total pages based on the products we received.
  let effectiveTotalPages = apiTotalPages;

  if (productsOnThisPage === 0 && currentPage > 1) {
    // If we land on an empty page (e.g., API was wrong, or user bookmarked a bad page)
    // set the total pages to be the *previous* page.
    effectiveTotalPages = currentPage - 1;
  } else if (productsOnThisPage < PRODUCT_LIMIT_PER_PAGE) {
    // If we received fewer products than the limit, this *must* be the last page
    // that has products. Set the total pages to the current page number.
    // This also handles the case of 0 products on page 1.
    effectiveTotalPages = currentPage;
  }

  return (
    <>
      {/* Products Section */}
      <section className="flex flex-wrap justify-start p-3 sm:p-4 lg:p-6 gap-4 sm:gap-5 lg:gap-6">
        {/* Looping on products */}
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="relative w-full sm:w-[48%] md:w-[31%] lg:w-[30%] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No products found.</p>
        )}
      </section>

      {/* Pagination Section */}
      <div className="flex justify-center mt-6 sm:mt-8 lg:mt-10">
        <PaginationSection
          currentPage={currentPage}
          totalPages={effectiveTotalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
