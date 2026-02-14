import OrderStatus from "./_components/order-statistics/order-status";
import Revenue from "./_components/order-statistics/revenue";
import FirstRow from "./_components/all-categories/first-row";
import TopSellingProducts from "@/components/features/selling-product/top-selling-product";
import LowStockProducts from "@/components/features/stock-product/low-stock-product";

export const dynamic = "force-dynamic";

// src/app/[locale]/dashboard/page.tsx
export default function Page({ params }: { params: { locale: string } }) {




  const { locale } = params;
  return (
    <main >


      {/* All Categories Section */}
      <section>
        <FirstRow locale={locale} />
      </section>

      {/* Orders Statistics Section */}
      <section className="w-full h-[23.8125rem] flex gap-6 pb-6">
        {/* OrderStatus Section */}
        <OrderStatus />
        {/* Revenue Section */}
        <Revenue />
      </section>

      <section className="flex gap-6">
        <div className="w-1/2">
          <TopSellingProducts />
        </div>
        <div className="w-1/2">
          <LowStockProducts />
        </div>
      </section>

    </main>


  );
}

