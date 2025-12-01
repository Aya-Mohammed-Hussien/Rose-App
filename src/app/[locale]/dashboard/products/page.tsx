import { getDashboardProducts } from '@/lib/apis/products/product.api';
import { AllProductsPage } from './_components/all-products-page';

type ProductsRoutePageProps = {
  searchParams?: {
    page?: string;
  };
};

export default async function ProductsRoutePage({ searchParams }: ProductsRoutePageProps) {
  try {
    const page = searchParams?.page ? Number(searchParams.page) || 1 : 1;

    const { products } = await getDashboardProducts({
      page,
      limit: 12,
    });

    return <AllProductsPage products={products} />;
  } catch (error) {
    console.error(error);
    return <div>Failed to load products.</div>;
  }
}
