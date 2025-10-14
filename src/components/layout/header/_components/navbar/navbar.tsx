'use client';
import { Link } from '@/i18n/navigation';
import { House, Gift, ClipboardList, PartyPopper, Headset, Info } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  //Translations
  const t = useTranslations('header.nav');

  const Navlinks = [
    { name: t('home'), href: '/', icon: House },
    { name: t('products'), href: '/products', icon: Gift },
    { name: t('categories'), href: '/categories', icon: ClipboardList },
    { name: t('occasions'), href: '/occasions', icon: PartyPopper },
    { name: t('contact'), href: '/contact', icon: Headset },
    { name: t('about'), href: '/about', icon: Info },
  ];

  return (
    <nav className="bg-maroon-700 dark:bg-softPink-200">
      <ul className="flex justify-center items-center gap-4">
        {Navlinks.map(({ name, href, icon: Icon }) => (
          <li key={name}>
            <Link
              href={href}
              className="flex items-center gap-2 text-zinc-50 dark:text-zinc-800 
                         text-base font-medium py-3.5 px-3 capitalize 
                         border-b-2 border-transparent 
                         transition-all duration-200 
                         hover:text-softPink-200 dark:hover:text-maroon-800 
                         hover:border-softPink-200 dark:hover:border-maroon-800"
            >
              <Icon size={20} />
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
