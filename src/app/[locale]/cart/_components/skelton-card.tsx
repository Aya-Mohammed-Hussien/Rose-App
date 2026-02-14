export default function SkeletonCard() {
  return (
    <div className="w-full lg:max-w-[34rem]">
      <div className="border border-zinc-200 rounded-md min-h-[320px] flex flex-col justify-center items-center animate-pulse">
        {/* Cart icon placeholder */}
        <div className="w-40 h-40 bg-zinc-200 rounded-md mb-8" />

        {/* Text placeholder */}
        <div className="h-4 bg-zinc-200 rounded w-1/3" />
      </div>
    </div>
  );
}
