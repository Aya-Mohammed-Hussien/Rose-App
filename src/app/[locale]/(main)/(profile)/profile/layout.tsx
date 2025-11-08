'use client';

import React from 'react';
import Sidebar from './_components/sidebar';
import { useLocale, useTranslations } from 'next-intl';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  // Translation
  const t = useTranslations('profile');
  const locale = useLocale();
  return (
    <div className="flex gap-9 flex-col m-5">
      {/* Title */}
      <div
        className={cn(' text-zinc-800 font-bold', `${locale === 'ar' ? 'text-3xl' : 'text-5xl'}`)}
      >
        <h1>{t('title')}</h1>
      </div>

      <div className="flex  gap-9 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content - 3/4 width */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
