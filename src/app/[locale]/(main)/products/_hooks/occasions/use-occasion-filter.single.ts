'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PARAM = 'occasion';

// Manages multi-select occasion filters, synced with the URL (?occasion=id&occasion=id)
export function useOccasionFilterSingle() {
  const router = useRouter();
  const sp = useSearchParams();

  // Hydrate initial state from URL
  const [selected, setSelected] = useState<string[]>(() => sp.getAll(PARAM));

  // Skip the first effect run — the URL already reflects the initial state
  const isFirstRun = useRef(true);

  // Sync selected state → URL on every change after mount
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    // Read a fresh URL snapshot to preserve other active filters
    const p = new URLSearchParams(window.location.search);
    p.delete(PARAM);
    selected.forEach((id) => p.append(PARAM, id));
    p.set('page', '1'); // Reset pagination on filter change
    router.replace(`?${p.toString()}`, { scroll: false });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]); // Only `selected` drives this — NOT `sp` (avoids re-render loop)

  const isSelected = useCallback((id: string) => selected.includes(id), [selected]);

  // Toggle an occasion on/off, capped at 2 simultaneous selections
  const toggle = useCallback(
    (id: string) =>
      setSelected((prev) => {
        if (!prev.includes(id) && prev.length >= 2) return prev;
        return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      }),
    []
  );

  const reset = useCallback(() => setSelected([]), []);

  return { selected, isSelected, toggle, reset };
}
