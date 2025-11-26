'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { Flower } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function PreviewWebsiteButton() {
  // Translation
  const t = useTranslations('previewButton');
  const locale = useLocale();

  return (
    <Link href="/" className="w-fit" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Button className="mb-6 flex h-11 w-60 items-center justify-center gap-2 rounded-xl bg-[#A6252A] text-sm font-semibold text-white hover:bg-[#8c1f23]">
        {/* Button icon */}
        <Flower className="w-6 h-6" />
        {/* Localized button text */}
        <span className="text-base font-semibold">{t('previewWebsite')}</span>
      </Button>
    </Link>
  );
}
