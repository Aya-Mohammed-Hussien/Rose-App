import { getProducts } from '@/lib/apis/products/product-list-filter';
import { ProductsByOccasionResponse } from '@/lib/types/product';
import Products from './_components/product-list';
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
  const productsData: ProductsByOccasionResponse = await getProducts(searchParams);

  return (
    <main className="flex w-full">
      {/* Sidebar */}
      <aside className="w-[280px] flex-shrink-0 flex flex-col gap-8 mx-4 my-11">
        {/* Category */}
        <CategoriesFilter />
        <hr className="border-t border-gray-200 " />

        {/* Occassions */}
        <OccasionsSection />
        <hr className="border-t border-gray-200 " />

        {/* Rating */}
        <RatingFilter />
        <hr className="border-t border-gray-200 " />

        {/* Price Range */}
        <PriceRangeForm />
        <hr className="border-t border-gray-200 " />
        
        {/* Reset All */}
        <ResetAllButton />
      </aside>

      {/* Products section  */}
      <div className="flex-1 my-11 mr-4">
        <Products productsData={productsData} />
      </div>
    </main>
  );
}
