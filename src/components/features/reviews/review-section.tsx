import { useLocale, useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

export default function ReviewsSection() {
  // Translations

  const t = useTranslations();
  const locale = useLocale();
  // Variable
  const stars = Array.from({ length: 5 });

  return (
    <div className="border-b border-[#E4E4E7] mb-5 px-4 sm:px-6 lg:px-0">
      {
        locale === 'ar' ? (
          <h2 className="relative font-bold text-[#741C21] text-xl sm:text-2xl lg:text-3xl mb-5">
            <span className="relative z-50">{t('product-reviews')}</span>
            <span className="absolute bg-red-100 right-0 top-5 rounded-e-lg w-[12%] sm:w-[10%] lg:w-[9.5%] h-3 sm:h-4"></span>
            <span className="absolute right-0 -bottom-1 w-12 sm:w-14 lg:w-16 h-[2px] sm:h-[3px] bg-red-500"></span>
          </h2>
        ) : (
          <h2 className="relative font-bold text-[#741C21] text-xl sm:text-2xl lg:text-3xl mb-5">
            <span className="relative z-50">{t('product-reviews')}</span>
            <span className="absolute bg-red-100 left-0 top-5 rounded-s-lg w-[12%] sm:w-[10%] lg:w-[9.5%] h-3 sm:h-4"></span>
            <span className="absolute left-0 -bottom-1 w-12 sm:w-14 lg:w-16 h-[2px] sm:h-[3px] bg-red-500"></span>
          </h2>
        )
      }

      <h3 className="font-semibold text-base sm:text-lg lg:text-xl">{t('general-rating')}:</h3>
      <div className="flex items-center gap-2">
        <p className="font-bold text-xl sm:text-2xl">4.5</p>
        <span className="font-medium text-xs text-gray-400">(8 rating)</span>
      </div>
      <div className="flex gap-1 mb-5">
        {stars.map((_, i) => (
          <Star
            key={i}
            strokeWidth={2}
            color="#FFA500"
            fill="#FFA500"
            className="transition-all duration-200 w-4 h-4 sm:w-5 sm:h-5"
          />
        ))}
      </div>
    </div>
  );
}
