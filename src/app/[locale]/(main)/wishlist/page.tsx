import React from 'react';
import { getTranslations } from 'next-intl/server';
import WishlistContent from './_components/wishlist-content';

export default async function WishlistPage() {
  const t = await getTranslations('Wishlist');

  return (
    <main className="py-6 sm:py-8 lg:py-10">
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8 text-[#741C21] border-b border-zinc-100 pb-4">
          {t('title')}
        </h1>

        {/* Client-side content for dynamic wishlist management */}
        <WishlistContent />
      </div>
    </main>
  );
}
