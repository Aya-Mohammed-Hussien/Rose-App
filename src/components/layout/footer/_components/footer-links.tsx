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
    <div className="ps-4">
      <p className="text-softPink-300 text-lg font-semibold">{t('title')}</p>
      <ul className="text-zinc-100 text-base font-medium tracking-normal space-y-1.5 list-none leading-none">
        {links.map(({ key, href }) => (
          <li key={key}>
            <Link href={href}>{t(`links.${key}`)}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
