'use client';

import { useEffect } from 'react';

export default function ProductError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Product page error:', error);
  }, [error]);

  return (
    <div className="text-red-600 text-center p-10">
      Something went wrong: {error.message}
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
