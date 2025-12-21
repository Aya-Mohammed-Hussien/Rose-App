
import TopSellingProducts from "@/components/features/selling-product/top-selling-product";
import LowStockProducts from "@/components/features/stock-product/low-stock-product";

// src/app/[locale]/dashboard/page.tsx
export default function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <main >


      {/* All Categories Section */}
      <section>

      </section>

      {/* Orders Statistics Section */}
      <section className="w-full h-[23.8125rem] flex gap-6 pb-6">
        {/* OrderStatus Section */}

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

