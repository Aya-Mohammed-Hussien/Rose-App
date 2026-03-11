'use client';

import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { House, Gift, ClipboardList, PartyPopper, Headset, Info, X, Menu } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('header.nav');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const Navlinks = [
    { name: t('home'), href: '/', icon: House },
    { name: t('products'), href: '/products', icon: Gift },
    { name: t('categories'), href: '/categories', icon: ClipboardList },
    { name: t('occasions'), href: '/occasions', icon: PartyPopper },
    { name: t('contact'), href: '/contact', icon: Headset },
    { name: t('about'), href: '/about', icon: Info },
  ];

  return (
    <>
      {/* Hamburger / Close toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="lg:hidden text-zinc-50 dark:text-zinc-800 hover:bg-maroon-600 dark:hover:bg-softPink-300"
        aria-label="Toggle menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </Button>

      {/* Overlay – always in DOM, fades in/out */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] lg:hidden
                            transition-opacity duration-300
                            ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      />

      {/* Drawer – slides in from the correct edge based on direction */}
      <nav
        className={`fixed top-0 h-full w-[280px] sm:w-[320px]
                    bg-white dark:bg-zinc-800 z-[70] lg:hidden shadow-xl
                    transition-transform duration-300 ease-in-out
                    ${isRTL ? 'right-0' : 'left-0'}
                    ${open ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <span className="font-bold text-lg text-zinc-800 dark:text-zinc-50">Menu</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="text-zinc-800 dark:text-zinc-50"
          >
            <X size={20} />
          </Button>
        </div>

        {/* Nav links */}
        <ul className="flex flex-col gap-1 p-4">
          {Navlinks.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-zinc-800 dark:text-zinc-50
                               text-base font-medium py-3 px-4 capitalize rounded-lg
                               hover:bg-zinc-100 dark:hover:bg-zinc-700
                               transition-all duration-200"
              >
                <Icon size={20} />
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
