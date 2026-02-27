import OccasionsProduct from '@/components/dashboard-features/all-occasions/occasions-product';
import AllOccasionsSkeleton from '@/components/skeletons/all-occasions-skeleton';
import { Suspense } from 'react';

interface OccasionsPageProps {
    searchParams: { page?: string };
}

export default function OccasionsPage({ searchParams }: OccasionsPageProps) {
    return (
        <div>
            <Suspense fallback={<AllOccasionsSkeleton />}>
                <OccasionsProduct searchParams={searchParams} />
            </Suspense>
        </div>
    );
}
