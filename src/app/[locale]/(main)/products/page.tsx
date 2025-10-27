import { getProducts } from '@/lib/apis/products/product-list-filter';
import { ProductsByOccasionResponse } from '@/lib/types/product';
import Products from './_components/products';
import OccasionsSection from './_components/occasions/occasions-section';
import PriceRangeForm from './_components/price/price-range-fields';

export default async function ProductsPage({
  searchParams = {},
}: {
  searchParams?: Record<string, any>;
}) {
  const data: ProductsByOccasionResponse = await getProducts(searchParams);

  return (
    <main className="flex flex-row  ">
      {/* <div>
        {' '}
        <OccasionsSection />
        <PriceRangeForm />
      </div> */}

      <div>
        <Products data={data} />
      </div>
    </main>
  );
}
