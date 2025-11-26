import ProductOrders from '@/components/features/orders/product-orders';
import { useTranslations } from 'next-intl';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersPage() {
  // Translations
  const t = useTranslations();

  return (
    <div className="container px-10 py-20 space-y-4">
      <h3 className="text-5xl font-bold text-primary">{t('orders')}</h3>

      <Suspense fallback={<Skeleton className="h-40 w-full" />}>
        <ProductOrders />
      </Suspense>
    </div>
  );
}
