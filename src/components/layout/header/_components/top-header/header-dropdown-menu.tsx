'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, usePathname } from '@/i18n/navigation';
import { handleLogout } from '@/lib/utils/logout.util';
import { ChevronDown, LogOut, MapPinHouse, ScrollText, Settings, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Props
type userNames = {
  firstName: string;
  lastName: string;
};
type DropdownMenuProps = {
  session: userNames;
};

export default function HeaderDropdownMenu({ session }: DropdownMenuProps) {
  // Translations
  const t = useTranslations('header.top-nav');
  const pathname = usePathname();

  // Getting user data
  if (!session) return null;
  const { firstName, lastName } = session;

  // Variables
  const isArabic = pathname.startsWith('/ar');

  return (
    <DropdownMenu>
      <div
        className={`border-e border-zinc-200 dark:border-e-zinc-700 pe-2 sm:pe-4 py-1.5 flex gap-1 items-center ${isArabic ? `flex-row-reverse` : 'flex-row'}`}
      >
        {/* Hello + user firstname */}
        <div className="flex flex-col leading-none">
          <span className="text-zinc-500 font-normal text-[0.625rem] sm:text-[0.75rem] leading-none">
            {t('hello')}
          </span>
          <span className="text-maroon-700 dark:text-softPink-200 font-medium text-sm sm:text-base leading-none">
            {firstName}
          </span>
        </div>

        {/* Trigger */}
        <DropdownMenuTrigger>
          <ChevronDown size={16} className="text-zinc-500 sm:w-[18px] sm:h-[18px]" />
        </DropdownMenuTrigger>
      </div>

      <DropdownMenuContent>
        {/* User firstName & lastName */}
        <DropdownMenuLabel>
          {firstName} {lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* User Profile */}
        <DropdownMenuItem asChild>
          <Link href="/profile/my-account">
            <User size={16} strokeWidth={2} />
            {t('profile')}
          </Link>
        </DropdownMenuItem>

        {/* User Addresses */}
        <DropdownMenuItem asChild>
          <Link href="/addresses">
            <MapPinHouse size={16} strokeWidth={2} />
            {t('addresses')}
          </Link>
        </DropdownMenuItem>

        {/* User Orders */}
        <DropdownMenuItem asChild>
          <Link href="/orders">
            <ScrollText size={16} strokeWidth={2} />
            {t('orders')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* User Dashboard */}
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <Settings size={16} strokeWidth={2} />
            {t('dashboard')}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut size={16} strokeWidth={2} />
          {t('logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
