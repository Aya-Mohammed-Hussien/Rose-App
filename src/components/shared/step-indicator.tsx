'use client';

import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  const progressWidth = currentStep === 1 ? 'w-1/3' : currentStep === 2 ? 'w-2/3' : 'w-0';

  return (
    <div className="relative flex items-center h-[1.5625rem] mx-auto">
      <div className="relative flex items-center w-full h-[1.5625rem]">
        {/* Background line */}
        <div className="absolute top-1/2 left-0 w-full h-[0.375rem] bg-gray-200 rounded-full -translate-y-1/2" />

        {/* Progress line */}
        <div
          className={cn(
            'absolute top-1/2 left-0 h-[0.375rem] bg-maroon-600 rounded-full -translate-y-1/2 transition-all duration-500 ease-in-out',
            progressWidth
          )}
        />

        {/* Step 1 */}
        <div
          className={cn(
            'absolute flex items-center justify-center w-[1.5625rem] h-[1.5625rem] rounded-full font-semibold text-sm transition-all duration-300 left-1/3 -translate-x-1/2',
            currentStep >= 1
              ? 'bg-maroon-600 text-white'
              : 'bg-zinc-200 text-zinc-500 border border-zinc-200'
          )}
        >
          1
        </div>

        {/* Step 2 */}
        <div
          className={cn(
            'absolute flex items-center justify-center w-[1.5625rem] h-[1.5625rem] rounded-full font-semibold text-sm transition-all duration-300 right-1/3 translate-x-1/2',
            currentStep >= 2
              ? 'bg-maroon-600 text-white'
              : 'bg-zinc-200 text-zinc-500 border border-zinc-200'
          )}
        >
          2
        </div>
      </div>
    </div>
  );
}
