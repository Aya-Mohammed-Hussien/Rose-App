
import CategoriesProduct from '@/components/dashboard-features/all-categories/categories-product';
import AllCategoriesSkeleton from '@/components/skeletons/all-categories-skeleton';
import { Suspense } from 'react';

// Props
interface CategoriesPageProps {
    searchParams: { page?: string };
}

export default function CategoriesPage({ searchParams }: CategoriesPageProps) {
    return (
        <div>
            <Suspense fallback={<AllCategoriesSkeleton />}>
                <CategoriesProduct searchParams={searchParams} />
            </Suspense>
        </div>
    )
}
