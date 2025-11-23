import TopSellingProducts from '@/components/features/selling-product/top-selling-product';
import FirstRow from './_components/first-row';
import LowStockProducts from '@/components/features/stock-product/low-stock-product';

export default function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <div className="bg-zinc-50 ms-[18.9375rem] mt-[4.375rem] pt-[1.625rem] pe-[1.5625rem] ps-4">
      {/* Overview of overall statistics + categories */}
      <FirstRow locale={locale} />
      <div
        className="
        
              
              mt-6
               flex flex-col md:flex-row items-stretch
              justify-start
             
            "
      >
        <div className="w-full md:w-1/2">
          <TopSellingProducts />
        </div>

        <div className="w-full md:w-1/2">
          <LowStockProducts />
        </div>
      </div>
    </div>
  );
}
