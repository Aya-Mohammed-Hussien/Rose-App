'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function ResendCodeButton() {
  // Seconds
  const [time, setTime] = useState(0);

  // Function
  const handleClick = () => {
    setTime(60);
    const countdown = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };
  // Variable
  const isDisabled = time > 0;

  return (
    <div className="w-full flex justify-end mt-4">
      {/* Resend Code Button */}
      <Button
        variant="ghost"
        onClick={handleClick}
        disabled={isDisabled}
        className={`font-primary font-medium text-base text-[#27272A]
          bg-transparent shadow-none hover:bg-transparent hover:text-[#27272A]
          focus-visible:ring-0 focus-visible:outline-none active:outline-none
          transition-opacity duration-200 ease-in-out
          ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Send a new code
      </Button>
    </div>
  );
}
