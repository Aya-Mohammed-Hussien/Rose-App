'use client';

import React from 'react';
import { LoaderCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

/**
 * WishlistEmpty component - Single Responsibility: Render the empty state UI.
 */
export function WishlistEmpty() {
  const t = useTranslations('Wishlist');

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-zinc-50 p-6 rounded-full mb-4">
        <LoaderCircle className="w-12 h-12 text-zinc-300" strokeWidth={1} />
      </div>
      <p className="text-xl text-zinc-500 font-medium">{t('empty')}</p>
    </div>
  );
}
