'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function ToggleLocale() {
  // Translation
  const locale = useLocale();
  const t = useTranslations('header.top-nav');

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Toggle-locale function
  const toggleLocale = () => {
    router.push(`${pathname}${location.search}`, {
      locale: locale === 'ar' ? 'en' : 'ar',
    });
  };

  return (
    <button
      onClick={toggleLocale}
      className="font-normal text-base ps-4 py-0 text-zinc-700 dark:text-zinc-50"
    >
      {t('locale-button')}
    </button>
  );
}
