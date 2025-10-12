'use client';

import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import SearchButton from './search-button';

export default function SearchBar() {
  const t = useTranslations('header.top-nav');

  return (
    <div className="relative w-full me-8">
      {/* Search Button */}
      <SearchButton />

      {/* Input Field */}
      <Input
        placeholder={t('search-placeholder')}
        className="
          w-full rounded-[0.625rem] border border-zinc-300 dark:border-zinc-600
          bg-white dark:bg-zinc-700 px-10 text-sm text-zinc-700
           placeholder:text-zinc-400 outline-none
          focus:outline-none focus:ring-0 focus:border-zinc-300"
        style={{ boxShadow: 'none' }}
      />
    </div>
  );
}
