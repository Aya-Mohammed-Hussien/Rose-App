// src/app/products/_hooks/occasions/use-intersection.ts
'use client';

import { RefObject, useEffect, useRef } from 'react';

// Options type (adds optional rootRef to IntersectionObserver options)
type Opts = IntersectionObserverInit & {
  rootRef?: RefObject<HTMLElement | null>;
};

// Custom hook: triggers callback when an element enters the viewport
export function useIntersection<T extends HTMLElement>(
  onIntersect: () => void,
  { rootRef, rootMargin = '200px', threshold = 0 }: Opts = {}
) {
  // Ref for the observed element
  const nodeRef = useRef<T | null>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Create IntersectionObserver instance
    const obs = new IntersectionObserver(
      (entries) => {
        const [e] = entries;
        // Call handler when element becomes visible
        if (e.isIntersecting) onIntersect();
      },
      {
        root: rootRef?.current ?? null, // Optional scroll container
        rootMargin, // Trigger before reaching view
        threshold,  // Percentage of visibility to trigger
      }
    );

    // Start observing the element
    obs.observe(node);

    // Cleanup observer on unmount
    return () => obs.disconnect();
  }, [onIntersect, rootRef, rootMargin, threshold]);

  // Return ref to attach to the target element
  return nodeRef;
}
