import { useTranslations } from 'next-intl';
import React from 'react';

export default function ReviewsSection() {
  // Translations
  const t = useTranslations();
  return (
    <div className="border-b border-[#E4E4E7] mb-3">
      <h3 className="relative font-bold text-[#741C21] text-3xl mb-8 ">
        <span className="relative z-50">{t('product-reviews')}</span>
        <span className="absolute bg-red-100 left-0 top-5 rounded-e-lg w-[9.5%] h-4"></span>
        <span className="absolute left-0 -bottom-1 w-16 h-[3px] bg-red-500"></span>
      </h3>
    </div>
  );
}
