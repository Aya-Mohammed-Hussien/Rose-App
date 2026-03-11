'use client';

import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import SearchButton from './search-button';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

export default function SearchBar() {
  // Translation
  const t = useTranslations('header.top-nav');

  // Form
  const form = useForm();

  return (
    <div className="relative w-full">
      {/* Search Button */}
      <SearchButton />

      {/* Input Field */}
      <Form {...form}>
        <Input
          placeholder={t('search-placeholder')}
          className="
          w-full rounded-[0.625rem] border border-zinc-300 dark:border-zinc-600
          bg-white dark:bg-zinc-700 px-10 text-sm text-zinc-700
           placeholder:text-zinc-400 outline-none
          focus:outline-none focus:ring-0 focus:border-zinc-300"
          style={{ boxShadow: 'none' }}
        />
      </Form>
    </div>
  );
}
