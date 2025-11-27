import { getCategoriesStatistics } from '@/lib/apis/dashboard/categories-statistics.api';
import { getTranslations } from 'next-intl/server';

export default async function Categories() {
  // Translation
  const t = await getTranslations('dashboard');

  // Fetch categories from BE
  const data = await getCategoriesStatistics();
  const categories = data?.statistics || [];

  // Variables
  const isEmpty = categories.length === 0 || !Array.isArray(categories);

  return (
    <section className="p-6 rounded-2xl bg-white h-[20.375rem] w-[36.375rem]">
      {/* Title of all categories */}
      <h3 className="font-semibold text-2xl text-zinc-800 font-inter mb-4">
        {t('all_categories')}
      </h3>

      {/* Fallback is categories array is empty or undefined & null */}
      {isEmpty ? (
        <p className="text-zinc-500 text-sm font-inter">{t('no_categories_found')}</p>
      ) : (
        // All Categories with fixed height and scroll
        <ul className="space-y-2.5 max-h-[14.5625rem] overflow-y-auto scrollbar-hide">
          {categories.map((category) => (
            <li
              key={category._id}
              className="border-b flex justify-between border-[rgba(0,0,0,0.08)] pb-2.5"
            >
              {/* Category name */}
              <span className="text-zinc-800 font-inter text-base font-normal capitalize">
                {category.name}
              </span>

              {/* Total number of products for each category */}
              <span className="text-sm font-medium font-inter text-zinc-800 bg-black/5 py-1 px-2 rounded-md capitalize">
                {category.totalProducts} {t('product_count', { count: category.totalProducts })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
