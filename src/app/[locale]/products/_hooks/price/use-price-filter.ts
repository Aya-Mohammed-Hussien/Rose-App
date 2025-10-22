// src/app/products/_hooks/use-price-filter.ts
'use client';

import { useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { PriceFilterValues } from '@/lib/schemes/price.schema';
import { UseFormReturn } from 'react-hook-form';

// Syncs price filter form with URL params
export function usePriceFilter(form: UseFormReturn<PriceFilterValues>) {
  const router = useRouter();
  const sp = useSearchParams();

  // Load values from URL on mount
  useEffect(() => {
    const min = sp.get('price[gt]');
    const max = sp.get('price[lt]');

    form.reset({
      min: min ? Number(min) : undefined,
      max: max ? Number(max) : undefined,
    });
  }, []);

  // Update URL when form changes
  useEffect(() => {
    const subscription = form.watch((values) => {
      const p = new URLSearchParams(sp.toString());

      p.delete('price[gt]');
      p.delete('price[lt]');

      if (values.min) p.set('price[gt]', String(values.min));
      if (values.max) p.set('price[lt]', String(values.max));

      router.replace(`?${p.toString()}`, { scroll: false });
    });

    return () => subscription.unsubscribe();
  }, [form.watch, sp, router]);

  // Reset form and clear URL
  const reset = useCallback(() => {
    form.reset({ min: undefined, max: undefined }, { keepValues: false });

    const p = new URLSearchParams(sp.toString());
    p.delete('price[gt]');
    p.delete('price[lt]');
    router.replace(`?${p.toString()}`, { scroll: false });
  }, [form, router, sp]);

  return { reset };
}
