import { getProducts } from '@/lib/apis/products/product-list-filter';
import { ProductsByOccasionResponse } from '@/lib/types/product';
import Products from './_components/products';

export default async function ProductsPage({
  searchParams = {},
}: {
  searchParams?: Record<string, any>;
}) {
  const data: ProductsByOccasionResponse = await getProducts(searchParams);

  return <Products data={data} />;
}
