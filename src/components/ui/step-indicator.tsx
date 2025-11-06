'use client';

interface StepIndicatorProps {
  currentStep: number;
}

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="relative flex items-center h-[25px] mx-auto">
      <div className="relative flex items-center w-full h-[25px]">
        <div className="absolute top-1/2 left-0 w-full h-[4px] bg-gray-200 rounded-full -translate-y-1/2"></div>

        <div
          className="absolute top-1/2 left-0 h-[4px] bg-red-700 rounded-full -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{
            width: currentStep === 1 ? '32%' : '100%',
          }}
        ></div>

        <div
          className={`absolute flex items-center justify-center w-7 h-7 rounded-full font-medium text-sm transition-all duration-300 ${
            currentStep >= 1
              ? 'bg-red-700 text-white'
              : 'bg-gray-100 text-gray-500 border border-gray-300'
          }`}
          style={{ left: '30%', transform: 'translateX(-50%)' }}
        >
          1
        </div>

        <div
          className={`absolute flex items-center justify-center w-7 h-7 rounded-full font-medium text-sm transition-all duration-300 ${
            currentStep >= 2
              ? 'bg-red-700 text-white'
              : 'bg-gray-100 text-gray-500 border border-gray-300'
          }`}
          style={{ right: '30%', transform: 'translateX(50%)' }}
        >
          2
        </div>
      </div>
    </div>
  );
}
