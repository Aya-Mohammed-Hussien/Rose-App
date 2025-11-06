import { Button } from '@/components/ui/button';
import { TicketPercent } from 'lucide-react';

export default function ApplyCoupon({
  coupon,
  setCoupon,
  applyCoupon,
  isPending,
  couponError,
  couponData,
}: any) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <input
          className="flex-1 border border-zinc-200 rounded-md px-3 py-2 text-sm placeholder:text-zinc-400"
          placeholder="Coupon Code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <Button
          onClick={() => applyCoupon(coupon)}
          disabled={isPending || !coupon}
          className="bg-[#A6252A] hover:bg-[#8b1f24] text-white flex items-center gap-2 px-4"
        >
          {' '}
          <TicketPercent size={18} /> {isPending ? 'Applying...' : 'Apply Coupon'}{' '}
        </Button>
      </div>

      <div className="border border-zinc-200 rounded-md flex items-center justify-center h-40 text-zinc-500 text-sm">
        {isPending
          ? 'Checking coupon...'
          : couponError
            ? couponError.message
            : couponData
              ? `✅ ${couponData.message}`
              : 'No coupons applied'}
      </div>
    </div>
  );
}
