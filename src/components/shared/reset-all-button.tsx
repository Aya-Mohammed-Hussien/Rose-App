'use client';

import React from 'react';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

export default function ResetAllButton() {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Functions
  const handleResetAll = () => {
    router.push(pathname, { scroll: false });
  };
  return (
    // Button
    <Button
      disabled={searchParams.toString().length === 0}
      onClick={handleResetAll}
      variant={'destructive'}
      className="font-semibold w-72"
    >
      {' '}
      {/* Icon */}
      <RotateCcw width={18} height={18} /> Reset All
    </Button>
  );
}
