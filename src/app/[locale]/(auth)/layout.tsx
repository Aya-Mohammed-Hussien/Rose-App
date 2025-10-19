import BottomOrnament from '@/components/shared/auth/ornaments/bottom-ornament';
import TopOrnament from '@/components/shared/auth/ornaments/top-ornament';
import Image from 'next/image';

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-screen  grid-cols-2 ">
      {/* Right Side - Register Form */}
      <div className="flex items-center justify-center bg-white px-[20px] py-[60px] ">
        <div className="w-full max-w-[740px] h-full flex flex-col gap-[10px] opacity-100">
          <div className="flex items-center justify-center p-8 overflow-auto ">
            <div className="max-w-[28.25rem] space-y-10">
              <div className="mb-10 text-right   text-gray-700 text-sm cursor-pointer ">
                العربية
              </div>

              <TopOrnament />
              <div>{children}</div>

              <BottomOrnament />
            </div>
          </div>
        </div>
      </div>

      {/* Left Side - Image */}
      <div className=" relative overflow-hidden  md:block">
        <Image
          src="/assets/image/132a2f7f5902767a6f99bcab7221e6bf3f2703e8.png"
          alt="Register background"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}
