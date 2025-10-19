import Image from 'next/image';

export default function BottomOrnament() {
  return (
    <div className="flex justify-center mt-6">
      <Image
        src="/assets/image/848dc8a0225f8d25495d83e5c7f2ab598dd3f997.png"
        alt="Bottom ornament"
        width={280}
        height={45}
        className="rotate-180 select-none"
      />
    </div>
  );
}
