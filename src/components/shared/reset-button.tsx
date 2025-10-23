import { X } from 'lucide-react';
import React from 'react';

// Props
type ResetButtonProps = {
  reset: () => void;
};

export default function ResetButton({ reset }: ResetButtonProps) {
  return (
    // Button
    <button
      type="button"
      className="flex   gap-1 justify-center items-center text-red-600 hover:text-red-700 transition"
      onClick={reset}
    >
      {/* Icon */}
      <X className="mt-[2px]" width={17} height={17} />
      <p>Reset</p>
    </button>
  );
}
