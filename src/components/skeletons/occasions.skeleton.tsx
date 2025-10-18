import { Skeleton } from "@/components/ui/skeleton";

export default function OccasionsSkeleton() {
  return (
    <div className="flex flex-col gap-8 mx-14">
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-20" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-[270px] w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
}
