import { getOverallStatistics } from '@/lib/apis/dashboard/overall-statistics.api';
import { cn } from '@/lib/utils';
import { Package, ReceiptText, ClipboardList, CircleDollarSign } from 'lucide-react';
import { getFormatter, getTranslations } from 'next-intl/server';
import { Link as I18nLink } from '@/i18n/navigation';

export default async function KPICards({ locale }: { locale: string }) {
  const t = await getTranslations('dashboard');
  const isArabic = locale === 'ar';
  const formatter = await getFormatter();

  let data;
  try {
    data = await getOverallStatistics();
  } catch (error) {
    const message = error instanceof Error ? error.message : '';
    const isAuthError = message.includes('authenticated') || message.includes('Session expired') || message.includes('log in');
    return (
      <section className="h-[20.375rem] w-1/2 grid place-items-center p-6 bg-white rounded-2xl">
        <div className="text-center text-zinc-600">
          <p className="font-medium mb-2">
            {isAuthError ? t('please_log_in_to_see_statistics') ?? 'Please log in to see statistics.' : message}
          </p>
          {isAuthError && (
            <I18nLink href="/login" className="text-maroon-600 font-semibold hover:underline">
              {t('log_in') ?? 'Log in'}
            </I18nLink>
          )}
        </div>
      </section>
    );
  }

  const overallStatistics = data.statistics;

  // Function to limit a number to max 7 digits
  function limitToSevenDigits(value: number) {
    // Number of digits
    const digits = Math.floor(Math.log10(value)) + 1;

    // if digits <= 7 then ok return it as it is
    if (digits <= 7) return Math.round(value);
    const factor = Math.pow(10, digits - 7);

    // round to closest 7-digit number
    return Math.round(value / factor) * factor;
  }

  // Variables
  const overallStatisticsCards = [
    {
      _id: 'total-products',
      bg: 'bg-maroon-50',
      label: t('total_products'),
      icon: Package,
      color: 'text-maroon-600',
      value: formatter.number(overallStatistics.totalProducts, 'decimal'),
    },
    {
      _id: 'total-orders',
      bg: 'bg-[rgb(242,247,252)]',
      label: t('total_orders'),
      icon: ReceiptText,
      color: 'text-blue-600',
      value: formatter.number(overallStatistics.totalOrders, 'decimal'),
    },
    {
      _id: 'total-categories',
      bg: 'bg-[rgb(248,245,252)]',
      label: t('total_categories'),
      icon: ClipboardList,
      color: 'text-purple-700',
      value: formatter.number(overallStatistics.totalCategories, 'decimal'),
    },
    {
      _id: 'total-revenue',
      bg: 'bg-[rgb(242,249,247)]',
      label: t('total_revenue'),
      icon: CircleDollarSign,
      color: 'text-emerald-600',
      value: formatter.number(limitToSevenDigits(overallStatistics.totalRevenue), 'decimal'),
    },
  ];

  return (
    <section className="h-[20.375rem] w-1/2 grid grid-cols-2 p-6 gap-4 bg-white rounded-2xl">
      {overallStatisticsCards.map((card) => (
        <div key={card._id} className={cn('flex flex-col p-4 rounded-xl', card.bg)}>
          {/* Statistics icon */}
          <card.icon className={cn('h-9 w-9 mb-3', card.color)} />

          {/* Statistics value */}
          <span className={cn('font-inter font-semibold text-2xl mb-1', card.color)}>
            {card._id === 'total-revenue' ? (
              <>
                {card.value}
                <span className="text-sm font-medium ms-1">{isArabic ? 'ج.م' : 'EGP'}</span>
              </>
            ) : (
              card.value
            )}
          </span>

          {/* Statistics label */}
          <span className="text-zinc-800 font-medium text-base font-inter">{card.label}</span>
        </div>
      ))}
    </section>
  );
}
