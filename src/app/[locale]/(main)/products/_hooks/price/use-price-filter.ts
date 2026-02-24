'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import type { PriceFilterValues } from '@/lib/schemes/price.schema';
import { UseFormReturn } from 'react-hook-form';

// Delay (ms) before pushing a price change to the URL — collapses rapid keystrokes
const DEBOUNCE_MS = 500;

export function usePriceFilter(form: UseFormReturn<PriceFilterValues>) {
  const router = useRouter();
  const sp = useSearchParams(); // Used only for initial hydration and external-reset detection

  // Holds the pending debounce timer so it can be cancelled on the next keystroke
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Populate the form inputs from the URL once on mount
  useEffect(() => {
    const min = sp.get('price[gt]');
    const max = sp.get('price[lt]');
    form.reset({
      min: min ? Number(min) : undefined,
      max: max ? Number(max) : undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty — runs once; `sp` in deps would cause an infinite loop

  // Push form values to the URL whenever they change (debounced)
  useEffect(() => {
    const subscription = form.watch((values) => {
      const hasMin = values.min !== undefined && values.min !== null;
      const hasMax = values.max !== undefined && values.max !== null;

      // Read a fresh URL snapshot to preserve other active filters
      const currentSearch = window.location.search;
      const urlHasMin = new URLSearchParams(currentSearch).has('price[gt]');
      const urlHasMax = new URLSearchParams(currentSearch).has('price[lt]');

      // Nothing to update — values are being cleared and the URL already has no price params
      if (!hasMin && !hasMax && !urlHasMin && !urlHasMax) return;

      if (debounceTimer.current) clearTimeout(debounceTimer.current);

      debounceTimer.current = setTimeout(() => {
        const p = new URLSearchParams(window.location.search);
        p.delete('price[gt]');
        p.delete('price[lt]');

        if (hasMin) p.set('price[gt]', String(values.min));
        if (hasMax) p.set('price[lt]', String(values.max));

        // Reset pagination only when a price range is actively applied
        if (hasMin || hasMax) p.set('page', '1');

        router.replace(`?${p.toString()}`, { scroll: false });
      }, DEBOUNCE_MS);
    });

    return () => {
      subscription.unsubscribe();
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [form, router]); // `sp` intentionally omitted — avoids re-render loop

  // Keep form in sync when price params are cleared externally (e.g. "Reset All")
  // Loop-safe: form.reset(undefined) → watch fires → early-return guard above exits → no router.replace
  useEffect(() => {
    const min = sp.get('price[gt]');
    const max = sp.get('price[lt]');

    if (min === null && max === null) {
      const currentMin = form.getValues('min');
      const currentMax = form.getValues('max');

      if (currentMin !== undefined || currentMax !== undefined) {
        form.reset({ min: undefined, max: undefined }, { keepValues: false });
      }
    }
  }, [sp, form]);

  // Clear form state and remove price params from the URL
  const reset = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    form.reset({ min: undefined, max: undefined }, { keepValues: false });

    // Use a fresh URL snapshot to avoid accidentally dropping other filter params
    const p = new URLSearchParams(window.location.search);
    p.delete('price[gt]');
    p.delete('price[lt]');
    router.replace(`?${p.toString()}`, { scroll: false });
  }, [form, router]);

  return { reset };
}
