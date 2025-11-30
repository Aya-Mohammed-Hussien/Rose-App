'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { LowStockProduct } from '@/lib/types/statistics';
import { getProductsStatistics } from '@/lib/apis/dashboard/product.api';
import LowStockSkeleton from '@/components/skeletons/Low-stock-skeleton';
import { useTranslations } from 'next-intl';

export default function LowStockProducts() {
  // Translations
  const t = useTranslations('dashboard.overview-product-top-and-stock');
  //State
  const [items, setItems] = useState<LowStockProduct[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Queries
   * Fetch Low Stock Products from API
   */
  useEffect(() => {
    async function loadData() {
      try {
        const res = await getProductsStatistics();

        // Save products with low stock
        setItems(res.statistics.lowStockProducts);
      } catch (error) {
        console.error('❌ Error loading low stock products:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  //Variables
  // Dynamic styling for quantity badge

  const getBadgeStyle = (qty: number) => {
    const base = 'text-[14px] font-medium leading-none rounded px-2 py-[2px] font-inter';

    return qty <= 5 ? `${base} text-red-600` : `${base} text-zinc-800`;
  };

  return (
    <div className="container mx-auto mb-2">
      <Card className="w-full max-w-xl bg-white p-6 rounded-2xl shadow h-[28rem] flex flex-col">
        {/* HEADER */}
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-2xl font-semibold tracking-tight text-zinc-800 font-inter">
            {t('Low Stock Products')}
          </CardTitle>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="flex-1 p-0 space-y-4 overflow-y-auto">
          {/* Skeleton while loading */}
          {loading && <LowStockSkeleton />}

          {/* Empty state */}
          {!loading && items.length === 0 && (
            <p className="text-zinc-600 text-center font-inter">No low stock products 🎉</p>
          )}

          {/* List of products */}
          {!loading &&
            items.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between w-full h-8 border-b border-black/10 pb-2"
              >
                {/* LEFT — Product Name */}
                <span className="truncate text-[16px] font-normal leading-none text-zinc-700 font-inter">
                  {item.title}
                </span>

                {/* RIGHT — Quantity Badge */}
                <span className={getBadgeStyle(item.quantity)}>{item.quantity} Products</span>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
