import { getDashboardProducts } from '@/lib/apis/products/get-all-products.api';
import AllProductsProduct from './all-products-product';

// Props
interface PageProps {
    searchParams: { page?: string };
}

export default async function ProductsProduct({ searchParams }: PageProps) {
    // Number of Page
    const currentPage = Number(searchParams?.page) || 1;

    // Data
    const { products, metadata } = await getDashboardProducts({
        page: currentPage,
        limit: 12,
    });

    return (
        <AllProductsProduct
            products={products}
            metadata={metadata}
        />
    );
}
