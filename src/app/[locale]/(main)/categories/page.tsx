import { getAllCategories } from '@/lib/apis/categories/get-all-categories.api';
import { Category } from '@/lib/types/category';
import Link from 'next/link';
import CategoriesPagination from './categories-pagination';
import { ArrowRight } from 'lucide-react';

// Props for the categories page
type CategoriesPageProps = {
  searchParams?: { page?: string };
};

// Response type for the categories API
type CategoriesResponse = {
  categories: Category[];
  metadata: {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
};

export default async function CategoriesPage({ searchParams = {} }: CategoriesPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const data: CategoriesResponse = await getAllCategories(currentPage);

  return (
    <main className="min-h-screen bg-gray-50/50 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 space-y-2">
          <h1 className="text-3xl font-bold text-zinc-900 sm:text-4xl tracking-tight">
            Browse by <span className="text-maroon-600">Category</span>
          </h1>
          <div className="h-1 w-20 bg-maroon-600 rounded-full" />
        </div>

        {/* Empty State */}
        {(!data.categories || data.categories.length === 0) && (
          <div className="py-20 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-3xl">
            No categories found in this section.
          </div>
        )}

        {/* Grid */}
        {data.categories && data.categories.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.categories.map((category: Category) => (
                <Link
                  key={category._id}
                  href={`/products?category=${category._id}`}
                  className="group relative block h-full"
                  aria-label={`View ${category.productsCount || 0} products in ${category.name} category`}
                >
                  <article
                    className="relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-maroon-200 hover:shadow-xl hover:shadow-maroon-900/5"
                    role="article"
                    aria-labelledby={`category-${category._id}`}
                  >

                    {/* Circle */}
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-maroon-50/50 transition-transform duration-500 group-hover:scale-150" />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header: Name & Count */}
                      <div className="flex items-start justify-between mb-4">
                        <h3
                          id={`category-${category._id}`}
                          className="text-xl font-bold text-zinc-900 transition-colors group-hover:text-maroon-700 capitalize"
                        >
                          {category.name}
                        </h3>
                        {category.productsCount !== undefined && (
                          <span className="text-xs font-bold text-maroon-600 bg-maroon-50 px-2.5 py-1 rounded-lg">
                            {category.productsCount}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-500 leading-relaxed mb-8 line-clamp-2">
                        Discover our premium collection of {category.name.toLowerCase()} tailored for your lifestyle.
                      </p>

                      {/* Footer Action */}
                      <div className="mt-auto flex items-center justify-between">
                        <span className="text-[11px] font-black uppercase tracking-widest text-gray-400 group-hover:text-maroon-500 transition-colors">
                          Explore Now
                        </span>

                        {/* Interactive button with maroon color */}
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon-600 text-white shadow-lg shadow-maroon-200 transition-all duration-300 group-hover:bg-maroon-700 group-hover:translate-x-1">
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>

                    {/* Bottom line that appears when hovering */}
                    <div className="absolute bottom-0 left-0 h-1 w-0 bg-maroon-600 transition-all duration-300 group-hover:w-full" />
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <CategoriesPagination metadata={data.metadata} />
          </>
        )}
      </div>
    </main>
  );
}