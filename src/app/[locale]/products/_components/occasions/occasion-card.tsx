// src/app/_sections/occasion-card.tsx
'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { Occasion } from '@/lib/types/occasion';

type Props = {
  occasion: Occasion;
  selected?: boolean;
  onToggle?: (id: string) => void;
};

export default function OccasionCard({ occasion, selected = false, onToggle }: Props) {
  // Render
  return (
    <Card
      onClick={() => onToggle?.(occasion._id)}
      className={cn(
        'relative overflow-hidden cursor-pointer rounded-md',
        'aspect-[133/74] w-full flex items-center justify-center'
      )}
    >
      {/* Background image */}
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${occasion.image}`}
        alt={occasion.name}
        fill
        priority={false}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
        className="object-cover"
      />

      {/* Gradient overlay */}
      {/* Normal / Hovered / Active states */}
      <div
        className={cn(
          'absolute inset-0 transition-all duration-300',
          selected
            ? '[background:linear-gradient(180deg,rgba(0,0,0,0.1375)_0%,rgba(166,37,42,0.55)_100%)]' // Active
            : 'bg-[linear-gradient(180deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0.8)_100%)] hover:bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.5)_100%)]' // Normal + Hover
        )}
      />

      {/* title */}
      <span className="relative text-white font-medium text-base text-center">{occasion.name}</span>
    </Card>
  );
}
