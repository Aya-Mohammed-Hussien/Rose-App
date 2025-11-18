import Categories from './categories';
import KPICards from './kpi-cards';

export default function FirstRow() {
  return (
    <section className="flex items-center gap-6 pb-6">
      <KPICards />
      <Categories />
    </section>
  );
}
