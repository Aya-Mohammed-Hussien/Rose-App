import ToggleLocale from '@/components/layout/header/toggle-locale';
import { CarouselSize } from './components/testmonial';
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  // Translaitions 
  const t =await getTranslations()
  return (
    <main>
      <h1 className="font-sarabun text-7xl font-bold">
       {t("heading")}
      </h1>
      <ToggleLocale />
      <CarouselSize />
    </main>
  );
}
