'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { TopSellingProduct } from '@/lib/types/statistics';
import { getProductsStatistics } from '@/lib/apis/dashboard/product.api';
import TopSellingSkeleton from '@/components/skeletons/top-selling- skeleton';
import { useTranslations } from 'next-intl';

export default function TopSellingProducts() {
  // Translations
  const t = useTranslations('dashboard.overview-product-top-and-stock');
  // State
  const [products, setProducts] = useState<TopSellingProduct[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Queries
   * Fetch top-selling products statistics
   */
  useEffect(() => {
    async function loadData() {
      try {
        const res = await getProductsStatistics();

        setProducts(res.statistics.topSellingProducts || []);
      } catch (error) {
        console.error('🔥 Failed to load products stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // Background color for each row (Top 3 highlighted)
  const getBgClass = (index: number) => {
    switch (index) {
      case 0:
        // 1st
        return 'bg-gradient-to-r from-[#DFAC163F] to-[#DFAC161A]';
      case 1:
        // 2nd
        return 'bg-gradient-to-r from-[#757F9550] to-[#757F951A]';
      case 2:
        // 3rd
        return 'bg-gradient-to-r from-[#91440040] to-[#9144001A]';
      default:
        // others
        return 'bg-zinc-100';
    }
  };

  // Font thickness per item rank
  const getFontClass = (index: number) => {
    if (index === 0) return 'font-semibold text-[16px] leading-none';
    if (index === 1) return 'font-medium text-[16px] leading-none';
    if (index === 2) return 'font-medium text-[16px] leading-none';
    return 'font-normal text-[16px] leading-none';
  };

  return (
    <div className="container mx-auto">
      <Card className="w-full max-w-xl bg-white p-6 rounded-2xl shadow h-[28rem] flex flex-col">
        {/* HEADER */}
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-800 font-inter">
            {t('Top Selling Products')}
          </CardTitle>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="p-0 flex-1 space-y-2 overflow-y-auto scrollbar-hide">
          {/* Skeleton Placeholder */}
          {loading && <TopSellingSkeleton />}

          {/* Empty State */}
          {!loading && products.length === 0 && (
            <p className="text-sm text-zinc-500 font-inter">No data available</p>
          )}

          {/* List */}
          {!loading &&
            products.map((item, index) => (
              <div
                key={item._id}
                className={`flex items-center justify-between w-full h-10 rounded px-3 py-2 ${getBgClass(
                  index
                )}`}
              >
                {/* LEFT — Title + Price */}
                <span
                  className={`truncate max-w-[70%] text-zinc-700 flex items-center gap-2 ${getFontClass(
                    index
                  )} font-inter`}
                >
                  {item.title}
                  <span className="text-[12px] font-normal leading-none font-inter">
                    ({item.price} EGP)
                  </span>
                </span>

                {/* RIGHT — Sales Number */}
                <span className="text-sm font-bold text-zinc-900 font-inter">
                  {item.sold}{' '}
                  <span className="font-inter font-medium text-sm leading-none text-zinc-900">
                    Sales
                  </span>
                </span>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
