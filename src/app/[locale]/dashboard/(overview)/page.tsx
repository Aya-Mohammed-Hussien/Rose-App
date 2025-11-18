import TopSellingProducts from '@/components/features/selling-product/top-selling-product';
import LowStockProducts from '@/components/features/stock-product/low-stock-product';

export default function DashboardProductsContainer() {
  return (
    <div
      className="
      container mx-auto
        max-w-6xl
        mt-6
         flex flex-col md:flex-row items-stretch
        justify-start
        gap-6
      "
    >
      <div className="w-full md:w-1/2">
        <TopSellingProducts />
      </div>

      <div className="w-full md:w-1/2">
        <LowStockProducts />
      </div>
    </div>
  );
}
