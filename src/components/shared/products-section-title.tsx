import { useTranslations } from 'next-intl';
import React from 'react';

interface titleProductProps {
  title: string;
}

const TitleProduct: React.FC<titleProductProps> = ({ title }) => {
  const t = useTranslations('TitleProduct');
  return (
    <h3 className="relative font-bold text-[#741C21] text-4xl">
      {' '}
      <span className="relative z-50">{t(title)}</span>{' '}
      <span className="absolute bg-red-100 top-7 rounded-e-lg w-2/12 h-4 start-0 rtl:end-0"></span>
      <span className="absolute -bottom-1 w-16 h-[3px] bg-red-500 start-0 rtl:end-0"></span>
    </h3>
  );
};

export default TitleProduct;
