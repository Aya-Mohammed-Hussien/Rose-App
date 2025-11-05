import ProductOrders from '@/components/features/orders/product-orders';
import { useTranslations } from 'next-intl';

export default function OrdersPage() {
  // Translations
  const t = useTranslations();
  return (
    <div className="container px-10 py-20 space-y-4">
      <h3 className="text-5xl font-bold text-primary">{t('orders')}</h3>
      <ProductOrders />
    </div>
  );
}
