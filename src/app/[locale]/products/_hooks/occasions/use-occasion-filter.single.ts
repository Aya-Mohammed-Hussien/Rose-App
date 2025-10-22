// src/app/_hooks/occasions/use-occasion-filter.single.ts
'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PARAM = 'occasion';

// Hook for managing multi-select occasion filters synced with URL (?occasion=id&occasion=id)
export function useOccasionFilterSingle() {
  const router = useRouter();
  const sp = useSearchParams();

  // Read all selected values from URL
  const initial = sp.getAll(PARAM);
  const [selected, setSelected] = useState<string[]>(initial);

  // Update URL on selection change (no scroll)
  useEffect(() => {
    const p = new URLSearchParams(sp.toString());
    p.delete(PARAM);
    selected.forEach((id) => p.append(PARAM, id));
    router.replace(`?${p.toString()}`, { scroll: false });
  }, [selected]);

  // Check if an ID is selected
  const isSelected = useCallback((id: string) => selected.includes(id), [selected]);

  // Toggle selection (add/remove)
  const toggle = useCallback(
    (id: string) =>
      setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    []
  );

  // Clear all selections
  const reset = useCallback(() => setSelected([]), []);

  return { selected, isSelected, toggle, reset };
}
