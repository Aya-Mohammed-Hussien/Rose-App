import ProductsProduct from '@/components/dashboard-features/all-products/products-product';
import AllProductsSkeleton from '@/components/skeletons/all-products-skeleton';
import { Suspense } from 'react';

// Props
interface ProductsPageProps {
    searchParams: { page?: string };
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
    return (
        <div>
            <Suspense fallback={<AllProductsSkeleton />}>
                <ProductsProduct searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
