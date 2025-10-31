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

  // Functions
  const handleResetAll = () => {
    deleteAll();
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
