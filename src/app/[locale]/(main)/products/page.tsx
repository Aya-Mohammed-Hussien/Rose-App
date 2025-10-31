// import { getProducts } from '@/lib/apis/products/product-list-filter';
// import { ProductsByOccasionResponse } from '@/lib/types/product';
// import Products from './_components/products';
// import OccasionsSection from './_components/occasions/occasions-section';
// import PriceRangeForm from './_components/price/price-range-fields';
// import CategoriesFilter from '@/components/features/categories/categories-filter';
// import RatingFilter from '@/components/features/rating/rating-filter';
// import ResetAllButton from '@/components/shared/reset-all-button';

// export default async function ProductsPage({
//   searchParams = {},
// }: {
//   searchParams?: Record<string, any>;
// }) {
//   const data: ProductsByOccasionResponse = await getProducts(searchParams);

//   return (
//     <main className="flex flex-row  ">
//       {/* <div>
//         {' '}
//         <OccasionsSection />
//         <PriceRangeForm />
//       </div> */}

//       <aside className="flex bg-red-300 flex-col gap-8 mx-4 my-11">
//         {/* Category  */}
//         <CategoriesFilter />

//         {/* Rating */}
//         <RatingFilter />

//         {/* Reset All */}
//         <ResetAllButton />
//       </aside>

//       <div className="flex-1 bg-green-300">
//         <Products data={data} />
//       </div>
//     </main>
//   );
// }

import { getProducts } from '@/lib/apis/products/product-list-filter';
import { ProductsByOccasionResponse } from '@/lib/types/product';
import Products from './_components/products';
import OccasionsSection from './_components/occasions/occasions-section';
import PriceRangeForm from './_components/price/price-range-fields';
import CategoriesFilter from '@/components/features/categories/categories-filter';
import RatingFilter from '@/components/features/rating/rating-filter';
import ResetAllButton from '@/components/shared/reset-all-button';

export default async function ProductsPage({
  searchParams = {},
}: {
  searchParams?: Record<string, any>;
}) {
  const data: ProductsByOccasionResponse = await getProducts(searchParams);

  return (
    <main className="flex w-full">
      {/* Sidebar */}
      <aside className="w-[280px] flex-shrink-0 flex flex-col gap-8 mx-4 my-11">
        {/* Category */}
        <CategoriesFilter />

        {/* Occasions */}
        <OccasionsSection />

        {/* Rating */}
        <RatingFilter />

        {/* Price Range */}
        <PriceRangeForm />
        {/* Reset All */}
        <ResetAllButton />
      </aside>

      {/* Products section (takes remaining width) */}
      <div className="flex-1 my-11 mr-4">
        <Products data={data} />
      </div>
    </main>
  );
}
