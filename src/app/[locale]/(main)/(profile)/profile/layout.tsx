'use client';

import React from 'react';
import Sidebar from './_components/sidebar';

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex m-5 gap-9 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content - 3/4 width */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
