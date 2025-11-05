'use client';

import React from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import { Lock, LogOut, UserRoundPen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  // Hooks
  const pathname = usePathname();

  // Navigation links for the sidebar
  const navLinks = [
    {
      href: '/profile/my-account',
      label: 'My Account',
      icon: UserRoundPen,
    },

    {
      href: '/profile/change-password',
      label: 'Change Password',
      icon: Lock,
    },
  ];
  return (
    // Sidebar Section
    <aside className="w-1/4 border border-zinc-100 flex flex-col justify-between bg-zinc-50 rounded-lg p-4">

      {/* Navigation */}
      <nav className="space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center  gap-2 px-4 py-3 rounded-md transition-colors',
                isActive
                  ? 'bg-zinc-800 text-zinc-50 font-medium transition-colors duration-200 '
                  : 'text-zinc-800 hover:bg-gray-50'
              )}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <Button
        onClick={() => signOut({ callbackUrl: '/login' })}
        className="bg-zinc-100 text-maroon-500 px-4 py-3 hover:text-zinc-50 transition-colors  duration-300 flex gap-2"
      >
        <LogOut className="rotate-180" size={20} /> Logout
      </Button>
    </aside>
  );
}
