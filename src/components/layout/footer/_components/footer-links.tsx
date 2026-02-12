'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function FooterLinks() {
  // Translations
  const t = useTranslations('footer');

  const links = [
    { key: 'home', href: '/' },
    { key: 'products', href: '/products' },
    { key: 'categories', href: '/categories' },
    { key: 'occasions', href: '/occasions' },
    { key: 'contact', href: '/contact' },
    { key: 'about', href: '/about' },
    { key: 'terms', href: '/terms' },
    { key: 'privacy', href: '/privacy' },
    { key: 'faq', href: '/faq' },
  ];

  return (
    <div className="ps-0 sm:ps-4 text-center sm:text-left">
      <p className="text-softPink-300 text-base sm:text-lg font-semibold mb-2 sm:mb-0">{t('title')}</p>
      <ul className="text-zinc-100 text-sm sm:text-base font-medium tracking-normal space-y-1.5 list-none leading-none">
        {links.map(({ key, href }) => (
          <li key={key}>
            <Link href={href} className="hover:text-softPink-300 transition-colors">
              {t(`links.${key}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
