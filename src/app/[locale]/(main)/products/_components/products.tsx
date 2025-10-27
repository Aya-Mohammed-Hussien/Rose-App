// 'use client';

// import ProductCard from '@/components/features/product-card/product-card';
// import WishlistButtonWrapper from '@/components/features/wishlist/wishlist-button-wrapper';
// import { useRouter, useSearchParams } from 'next/navigation';
// import PaginationSection from '@/components/features/pagination/pagination';
// import { ProductsByOccasionResponse } from '@/lib/types/product';

// type Props = {
//   data: ProductsByOccasionResponse;
// };

// export default function Products({ data }: Props) {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const products = data.products;

//   const handlePageChange = (page: number) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('page', String(page));
//     router.push(`?${params.toString()}`);
//   };

//   return (
//     <>
//       {/* Products Section */}
//       <section className="flex flex-wrap justify-end p-6 gap-6">
//         {products.length > 0 ? (
//           products.map((product) => (
//             <div key={product._id} className="relative w-[302px] flex-shrink-0">
//               <div className="absolute top-3 left-3 z-10">
//                 <WishlistButtonWrapper productId={product._id} />
//               </div>
//               <ProductCard product={product} />
//             </div>
//           ))
//         ) : (
//           <p className="text-center text-gray-500 w-full">No products found.</p>
//         )}
//       </section>

//       {/* Pagination Section */}
//       <div className="flex justify-center mt-10">
//         <PaginationSection
//           currentPage={data.metadata.currentPage}
//           totalPages={data.metadata.totalPages}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </>
//   );
// }

'use client';

import ProductCard from '@/components/features/product-card/product-card';
import WishlistButtonWrapper from '@/components/features/wishlist/wishlist-button-wrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import PaginationSection from '@/components/features/pagination/pagination';
import { ProductsByOccasionResponse } from '@/lib/types/product';

type Props = {
  data: ProductsByOccasionResponse;
};

// This must match the default 'limit' in your getProducts API call
const PRODUCT_LIMIT_PER_PAGE = 12;

export default function Products({ data }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, metadata } = data;
  const { currentPage, totalPages: apiTotalPages } = metadata;
  const productsOnThisPage = products.length;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  // --- START OF FIX ---
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
  // --- END OF FIX ---

  return (
    <>
      {/* Products Section */}
      <section className="flex flex-wrap justify-end p-6 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="relative w-[302px] flex-shrink-0">
              <div className="absolute top-3 left-3 z-10"></div>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No products found.</p>
        )}
      </section>

      {/* Pagination Section */}
      <div className="flex justify-center mt-10">
        <PaginationSection
          currentPage={currentPage}
          // Pass the corrected total pages to the pagination component
          totalPages={effectiveTotalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
