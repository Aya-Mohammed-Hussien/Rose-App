import { Card, CardContent } from '@/components/ui/card';

export default function SummarySkeleton() {
  return (
    <Card className="w-[458px] h-[605px] rounded-xl p-6 animate-pulse">
      <CardContent className="space-y-6 p-0">
        <div className="h-6 w-32 bg-zinc-200 rounded" />
        <div className="h-10 bg-zinc-200 rounded" />
        <div className="h-40 bg-zinc-200 rounded" />
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-zinc-200 rounded" />
          <div className="h-4 w-16 bg-zinc-200 rounded" />
        </div>
        <hr className="border-zinc-200" />
        <div className="flex justify-between">
          <div className="h-6 w-24 bg-zinc-200 rounded" />
          <div className="h-6 w-20 bg-zinc-200 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
