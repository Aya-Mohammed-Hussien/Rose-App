import { useLocale } from 'next-intl';
import React from 'react';

interface titleProductProps {
  title: string;
}

const TitleProduct: React.FC<titleProductProps> = ({ title }) => {
  const locale = useLocale();
  return locale === 'ar' ? (
    <h2 className="relative font-bold text-[#741C21] text-xl sm:text-2xl lg:text-3xl mb-5">
      <span className="relative z-50">منتجات قد تعجبك</span>
      <span className="absolute bg-red-100 right-0 top-5 rounded-e-lg w-[12%] sm:w-[10%] lg:w-[9.5%] h-3 sm:h-4"></span>
      <span className="absolute right-0 -bottom-1 w-12 sm:w-14 lg:w-16 h-[2px] sm:h-[3px] bg-red-500"></span>
    </h2>
  ) : (
    <h2 className="relative font-bold text-[#741C21] text-xl sm:text-2xl lg:text-3xl mb-5">
      <span className="relative z-50">{title}</span>
      <span className="absolute bg-red-100 left-0 top-5 rounded-s-lg w-[12%] sm:w-[10%] lg:w-[9.5%] h-3 sm:h-4"></span>
      <span className="absolute left-0 -bottom-1 w-12 sm:w-14 lg:w-16 h-[2px] sm:h-[3px] bg-red-500"></span>
    </h2>
  );
};

export default TitleProduct;