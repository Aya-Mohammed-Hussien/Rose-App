'use client';

import { HeartPlus } from 'lucide-react';

export default function AddToWishlistButton() {
  return (
    <div className="flex items-center justify-center rounded-[0.625rem] bg-zinc-100 dark:bg-transparent dark:border dark:border-zinc-500 w-[3.0625rem] h-[3.0625rem]">
      <HeartPlus size={25} className="text-zinc-800 dark:text-zinc-50" />
    </div>
  );
}
