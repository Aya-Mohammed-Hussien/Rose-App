'use client';

import PaginationSection from '@/components/features/pagination/pagination';
import { useRouter, useSearchParams } from 'next/navigation';

type OccasionsPaginationProps = {
  metadata: {
    currentPage: number;
    totalPages: number;
  };
};

export default function OccasionsPagination({ metadata }: OccasionsPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (metadata.totalPages <= 1) return null;

  return (
    <div className="mt-12 flex justify-center">
      <PaginationSection
        currentPage={metadata.currentPage}
        totalPages={metadata.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

