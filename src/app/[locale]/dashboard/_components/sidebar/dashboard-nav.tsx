'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ClipboardList, CalendarHeart, Package } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export function DashboardNav() {
  // Translation
  const t = useTranslations('dashboardNav');
  const locale = useLocale();

  // Navigation
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const activeKey = segments[2] ?? 'dashboard';

  // Variables
  const items = [
    { key: 'dashboard', href: '/dashboard', label: t('overview'), icon: LayoutDashboard },
    {
      key: 'categories',
      href: '/dashboard/categories',
      label: t('categories'),
      icon: ClipboardList,
    },
    { key: 'occasions', href: '/dashboard/occasions', label: t('occasions'), icon: CalendarHeart },
    { key: 'products', href: '/dashboard/products', label: t('products'), icon: Package },
  ];

  return (
    <nav dir={locale === 'ar' ? 'rtl' : 'ltr'} className="flex h-56 w-60 flex-col gap-2.5">
      {items.map(({ key, href, label, icon: Icon }) => {
        const active = activeKey === key;

        return (
          <Link key={href} href={href}>
            <button
              className={cn(
                'flex h-11 w-full items-center gap-2.5 rounded-xl px-2.5',
                'text-left text-lg font-bold leading-none',
                active ? 'bg-[#FBEAEA] text-red-600' : 'text-[#111111] hover:bg-[#F7F7F7]'
              )}
            >
              <Icon className="shrink-0 w-6 h-6" /> {/* Navigation icon */}
              <span>{label}</span> {/* Localized label */}
            </button>
          </Link>
        );
      })}
    </nav>
  );
}
