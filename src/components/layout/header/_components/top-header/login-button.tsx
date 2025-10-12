'use client';

import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LoginButton() {
  // Translation
  const t = useTranslations('header.top-nav');

  return (
    <div
      className="flex flex-row justify-center items-center gap-1.5 text-zinc-700 dark:text-zinc-50 
                border-e border-zinc-200 dark:border-e-zinc-700 pe-4"
    >
      {/* Login icon */}
      <User size={20} />

      {/* Login Button */}
      <Button
        variant="ghost"
        className="p-0 m-0 text-zinc-700 dark:text-zinc-50 font-normal text-base"
      >
        {t('login')}
      </Button>
    </div>
  );
}
