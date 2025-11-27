import { Suspense } from 'react';
import Categories from './categories';
import KPICards from './kpi-cards';
import CategoriesStatisticsSkeleton from '@/components/skeletons/categories-statistics.skeleton';
import KPICardsSkeleton from '@/components/skeletons/overall-statistics.skeleton';
interface FirstRowProps {
  locale: string;
}

export default function FirstRow({ locale }: FirstRowProps) {
  return (
    <section className="flex items-center gap-6 pb-6">
      {/* Overall statistics */}
      <Suspense fallback={<KPICardsSkeleton />}>
        <KPICards locale={locale} />
      </Suspense>

      {/* Categories Statistics */}
      <Suspense fallback={<CategoriesStatisticsSkeleton />}>
        <Categories />
      </Suspense>
    </section>
  );
}
