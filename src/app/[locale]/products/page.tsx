// app/products/page.tsx

import OccasionsSection from "./_components/occasions/occasions-section";
import PriceRangeForm from "./_components/price/price-range-fields";

export default async function ProductsPage() {

  return (
    <div className="space-y-10 w-[277px] h-[300px]">
      <OccasionsSection />
      <PriceRangeForm />
    </div>
  );
}
