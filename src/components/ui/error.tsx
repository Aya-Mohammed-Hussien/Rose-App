import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function error() {
  // Translations
  const t = useTranslations('error-page');

  return (
    <main className="min-h-screen bg-zinc-50 gap-12 flex flex-col justify-center items-center">
      {/* server-down Image */}
      <Image
        src="/assets/images/server-down..png"
        height={300}
        width={300}
        quality={100}
        alt="shield-image"
      />

      {/* Content */}
      <div className="flex flex-col gap-4 text-center">
        {/* Main Heading */}
        <h1 className="text-zinc-800 font-semibold font-inter text-4xl">
          {t('header')}
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-xl font-inter">
          {t('description')}
        </p>
      </div>
    </main>
  );
}
