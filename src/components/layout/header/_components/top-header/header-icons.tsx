'use client';

import { Link } from '@/i18n/navigation';
import { Heart, ShoppingCart } from 'lucide-react';

export default function HeaderIcons() {
  const icons = [
    { id: 1, icon: Heart, href: '/favorites', label: 'Favorites' },
    { id: 2, icon: ShoppingCart, href: '/cart', label: 'Cart' },
    //{ id: 3, icon: Bell, href: '/notifications', label: 'Notifications' },
  ];

  return (
    <ul className="flex justify-center items-center gap-2.5 px-4 py-2 border-e border-zinc-200 dark:border-e-zinc-700">
      {icons.map(({ id, icon: Icon, href, label }) => (
        <li key={id}>
          <Link href={href} aria-label={label} className="text-zinc-700 dark:text-zinc-50">
            <Icon size={24} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
