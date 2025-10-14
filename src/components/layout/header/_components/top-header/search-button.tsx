'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SearchButton() {
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn(
        'absolute left-4 top-1/2 -translate-y-1/2 p-0',
        'hover:bg-transparent focus-visible:ring-0'
      )}
    >
      <Search size={18} className="text-zinc-400" />
    </Button>
  );
}
