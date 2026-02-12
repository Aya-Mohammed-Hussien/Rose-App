'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Always log errors for debugging
    console.error('Global error boundary caught:', error);

    // Auto-recover from the known Embla runtime bug so it
    // doesn't crash the UI with an overlay.
    if (error?.message?.includes("ascDiffsToSnaps[0]")) {
      // Reset the route state and re-render the page.
      reset();
    }
  }, [error, reset]);

  // If this is the Embla error, we rely on `reset()` above to
  // re-render the UI, so render nothing here.
  if (error?.message?.includes("ascDiffsToSnaps[0]")) {
    return null;
  }

  // Fallback UI for any other unexpected errors.
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-zinc-50 text-zinc-900">
        <div className="px-4 py-6 rounded-xl bg-white shadow-md max-w-md text-center space-y-4">
          <h1 className="text-xl font-semibold">Something went wrong</h1>
          <p className="text-sm text-zinc-600">
            An unexpected error occurred. Please try again in a moment.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-2 inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

