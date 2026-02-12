'use client';

import { Link } from '@/i18n/navigation';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/[locale]/cart/_hooks/use-cart-query';

export default function HeaderIcons() {
  const { data: cart = [] } = useCart();
  const cartCount = cart.length;

  const icons = [
    { id: 1, icon: Heart, href: '/favorites', label: 'Favorites' },
  ];

  return (
    <ul className="flex justify-center items-center gap-2.5 px-4 py-2 border-e border-zinc-200 dark:border-e-zinc-700">
      {icons.map(({ id, icon: Icon, href, label }) => (
        <li key={id}>
          <Link href={href} aria-label={label} className="relative text-zinc-700 dark:text-zinc-50">
            <Icon size={24} />
          </Link>
        </li>
      ))}

      {/* Cart icon with badge */}
      <li>
        <Link href="/cart" aria-label="Cart" className="relative text-zinc-700 dark:text-zinc-50">
          <ShoppingCart size={24} />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-semibold text-white">
              {cartCount}
            </span>
          )}
        </Link>
      </li>
    </ul>
  );
}
