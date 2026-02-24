'use client';

import React from 'react';
import { Button } from '../ui/button';
import { RotateCcw } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useUrlParams } from '@/hooks/params/use-url-params';

export default function ResetAllButton() {
  // Hooks
  const { deleteAll } = useUrlParams();
  const searchParams = useSearchParams();

  // Only render when at least one filter is active
  const hasActiveFilters = searchParams.toString().length > 0;
  if (!hasActiveFilters) return null;

  return (
    <>
      <hr className="border-t border-gray-200" />
      <Button onClick={deleteAll} variant={'destructive'} className="font-semibold w-full">
        {/* Icon */}
        <RotateCcw width={18} height={18} /> Reset All
      </Button>
    </>
  );
}
