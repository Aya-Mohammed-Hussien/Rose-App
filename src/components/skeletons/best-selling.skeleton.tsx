import { Skeleton } from "@/components/ui/skeleton";

export default function BestSellingSkeleton() {
  return (
    <div className="flex gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2">
          <Skeleton className="h-[250px] w-[200px] rounded-xl" />
          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      ))}
    </div>
  );
}
