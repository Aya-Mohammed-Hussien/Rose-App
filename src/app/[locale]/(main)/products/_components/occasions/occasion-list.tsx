'use client';

import { useRef } from 'react';
import { X } from 'lucide-react';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { useOccasionFilterSingle } from '../../_hooks/occasions/use-occasion-filter.single';
import { useOccasions } from '../../_hooks/occasions/use-occasions';
import { useIntersection } from '../../_hooks/occasions/use-intersection';
import OccasionCard from './occasion-card';

export default function OccasionList() {
  // Translation
  const t = useTranslations('occasions');

  // State
  const { selected, isSelected, toggle, reset } = useOccasionFilterSingle();

  // Ref
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Queries
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useOccasions();

  // Variables
  const occasions = (data?.pages ?? []).flatMap((p) => p.occasions ?? []);

  // Functions
  const sentinelRef = useIntersection<HTMLDivElement>(
    () => {
      if (hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
    { rootRef: scrollRef }
  );

  // Render
  if (isLoading) return <p>{t('loading')}</p>;
  if (isError) return <p className="text-red-500">{t('error')}</p>;

  return (
    <section className=" h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-zinc-800">{t('title')}</h2>
        {selected.length > 0 && (
          <Button
            onClick={reset}
            variant="ghost"
            className="flex items-center justify-center gap-1 text-sm text-red-600 hover:bg-transparent"
          >
            <X className="w-4 h-4" />
            {t('reset')}
          </Button>
        )}
      </div>

      {/* Scrollable list */}
      <div ref={scrollRef} className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        {/* Occasion cards */}
        <div className="grid grid-cols-2 gap-2">
          {occasions.map((item) => (
            <OccasionCard
              key={item._id}
              occasion={item}
              selected={isSelected(item._id)}
              onToggle={toggle}
            />
          ))}
        </div>

        {/* Loader + Sentinel */}
        {hasNextPage && (
          <div ref={sentinelRef} className="flex items-center justify-center py-3">
            <p className="text-sm text-zinc-600">
              {isFetchingNextPage ? t('loadingMore') : t('scrollToLoad')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
