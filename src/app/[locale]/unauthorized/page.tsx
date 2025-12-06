import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function Unauthorized() {
  // Translations
  const t = useTranslations('unauthorized-page');
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-zinc-50 gap-12 flex flex-col justify-center items-center">
      {/* Shield Image */}
      <Image
        src="/assets/images/shield.png"
        height={260}
        width={260}
        quality={100}
        alt="shield-image"
      />

      {/* Content */}
      <div className="flex flex-col gap-3 text-center">
        {/* Main Heading */}
        <h1 className="text-zinc-800 font-semibold font-inter text-4xl">
          {t('header')}
        </h1>

        {/* Decription */}
        <p className="text-zinc-400 text-xl font-inter">
          {t('description')}
        </p>

        {/* Separator */}
        <hr className="w-3/5 mx-auto h-px bg-zinc-200" />

        {/* Back Button */}
        <Link href={'/'}>
          <Button className={cn("mx-auto", locale === 'ar' ? 'w-52' : 'w-44')} variant={'secondary'}>
            {t('go-to-home-button')}
          </Button>
        </Link>
      </div>
    </main>
  );
}
