'use client';

import { Button } from '@/components/ui/button';
import { MapPinPen } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function AddressIcon() {
  const { data: session } = useSession();

  // If no user session (not logged in), don't render the icon
  if (!session) return null;

  //Variables
  const userFirstAddress = session.user?.addresses?.[0]?.city || 'Cairo';
  return (
    <div className="flex flex-col gap-1 px-2.5 me-4 ">
      {/* Label above the address */}
      <span className="text-sm font-normal text-zinc-500">Deliver to:</span>

      {/* Row containing the address icon and city name */}
      <Button
        variant="ghost"
        className="p-0 h-auto hover:bg-transparent flex justify-center items-center gap-1.5 text-maroon-700 dark:text-softPink-200"
      >
        {/* Map pin icon */}
        <MapPinPen size={20} />

        {/* City name (First Address for user) */}
        <span className="text-base font-medium">{userFirstAddress}</span>
      </Button>
    </div>
  );
}
