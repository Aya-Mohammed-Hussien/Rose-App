'use client';

import { DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { LogOut, User as UserIcon } from 'lucide-react';
import { handleLogout } from '@/lib/utils/logout.util';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function UserMenuItems() {
  // Translation
  const locale = useLocale();
  const t = useTranslations('UserMenuItems');

  return (
    <>
      {/* Account option */}
      <Link href="/dashboard/account-settings">
        <DropdownMenuItem
          className={cn('flex items-center cursor-pointer', locale === 'ar' && 'flex-row-reverse')}
        >
          <UserIcon className={cn('h-4 w-4', locale === 'ar' ? 'ml-2' : 'mr-2')} />
          <span>{t('account')}</span>
        </DropdownMenuItem>
      </Link>

      <DropdownMenuSeparator />

      {/* Logout option */}
      <DropdownMenuItem
        onClick={handleLogout}
        className={cn('flex items-center cursor-pointer', locale === 'ar' && 'flex-row-reverse')}
      >
        <LogOut className={cn('h-4 w-4', locale === 'ar' ? 'ml-2' : 'mr-2')} />
        <span>{t('logout')}</span>
      </DropdownMenuItem>
    </>
  );
}
