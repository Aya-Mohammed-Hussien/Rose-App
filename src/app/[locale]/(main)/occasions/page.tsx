import { getOccasions } from '@/lib/apis/occasions/occasion.api';
import { Occasion, Metadata } from '@/lib/types/occasion';
import Link from 'next/link';
import OccasionsPagination from './occasions-pagination';
import { ArrowRight } from 'lucide-react';

// Props for the occasions page
type OccasionsPageProps = {
  searchParams?: { page?: string };
};

// Response type for the occasions API
type OccasionsResponse = {
  message: string;
  metadata: Metadata;
  occasions: Occasion[];
};

export default async function OccasionsPage({ searchParams = {} }: OccasionsPageProps) {
  const currentPage = Number(searchParams.page) || 1;

  // Fetch occasions (larger limit so we see more cards)
  const data: OccasionsResponse = await getOccasions(currentPage, 12);

  return (
    <main className="min-h-screen bg-gray-50/50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-2">
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl tracking-tight">
            Browse by <span className="text-maroon-600">Occasion</span>
          </h1>
          <div className="h-1 w-20 bg-maroon-600 rounded-full" />
        </div>

        {/* Empty state */}
        {(!data.occasions || data.occasions.length === 0) && (
          <div className="py-20 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
            No occasions available at the moment.
          </div>
        )}

        {/* Occasions grid */}
        {data.occasions && data.occasions.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.occasions.map((occasion: Occasion) => (
                <article
                  key={occasion._id}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-maroon-200 hover:shadow-xl hover:shadow-maroon-900/5 flex flex-col h-full"
                >
                  {/* Accent circle */}
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-maroon-50/50 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Title + count */}
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-zinc-900 transition-colors group-hover:text-maroon-700 capitalize line-clamp-1">
                        {occasion.name}
                      </h3>

                      {typeof occasion.productsCount !== 'undefined' && (
                        <span className="text-xs font-bold text-maroon-600 bg-maroon-50 px-2.5 py-1 rounded-lg">
                          {occasion.productsCount}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-8 line-clamp-2">
                      Shop curated products tailored for this occasion to make every moment memorable.
                    </p>

                    {/* Actions */}
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-maroon-500 transition-colors">
                        Occasion
                      </span>

                      <Link
                        href={`/products?occasion=${occasion._id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon-600 text-white shadow-lg shadow-maroon-200 transition-all duration-300 group-hover:bg-maroon-700 group-hover:translate-x-1"
                      >
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>

                  {/* Bottom line that appears when hovering */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 bg-maroon-600 transition-all duration-300 group-hover:w-full" />
                </article>
              ))}
            </div>

            {/* Pagination */}
            <OccasionsPagination metadata={data.metadata} />
          </>
        )}
      </div>
    </main>
  );
}

