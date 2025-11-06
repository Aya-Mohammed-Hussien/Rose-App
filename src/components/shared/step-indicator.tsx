'use client';
interface StepIndicatorProps {
  currentStep: number;
}
export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="relative flex items-center h-[1.5625rem] mx-auto">
      <div className="relative flex items-center w-full h-[1.5625rem]">
        <div className="absolute top-1/2 left-0 w-full h-[0.375rem] bg-gray-200 rounded-full -translate-y-1/2"></div>
        <div
          className="absolute top-1/2 left-0 h-[0.375rem] bg-maroon-600 rounded-full -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{
            width: currentStep === 1 ? '33.33%' : '66.67%',
          }}
        ></div>
        <div
          className={`absolute flex items-center justify-center w-[1.5625rem] h-[1.5625rem] rounded-full font-semibold text-sm transition-all duration-300 ${
            currentStep >= 1
              ? 'bg-maroon-600 text-white'
              : 'bg-zinc-200 text-zinc-500 border border-zinc-200'
          }`}
          style={{ left: '33.33%', transform: 'translateX(-50%)' }}
        >
          1
        </div>
        <div
          className={`absolute flex items-center justify-center w-[1.5625rem] h-[1.5625rem] rounded-full font-semibold font-m text-sm transition-all duration-300 ${
            currentStep >= 2
              ? 'bg-maroon-600 text-white'
              : 'bg-zinc-200 text-zinc-500 border border-zinc-200'
          }`}
          style={{ right: '33.33%', transform: 'translateX(50%)' }}
        >
          2
        </div>
      </div>
    </div>
  );
}