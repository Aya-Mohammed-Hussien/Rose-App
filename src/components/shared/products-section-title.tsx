import React from 'react';

interface titleProductProps {
  title: string;
}

const TitleProduct: React.FC<titleProductProps> = ({ title }) => {
  return (
    <h3 className="relative font-bold text-[#741C21] text-4xl">
      {' '}
      <span className="relative z-50">{title}</span>{' '}
      <span className="absolute bg-red-100 left-0 top-7 rounded-e-lg w-3/4 h-4"></span>{' '}
      <span className="absolute left-0 -bottom-1 w-16 h-[3px] bg-red-500"></span>{' '}
    </h3>
  );
};

export default TitleProduct;
