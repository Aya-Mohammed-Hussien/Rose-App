export default function AddressSkeleton() {
  return (
    <div className="w-full border border-gray-200 rounded-md p-4 animate-pulse bg-gray-50">
      <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 w-64 bg-gray-200 rounded mb-3"></div>
      <div className="flex gap-3 items-center">
        <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
