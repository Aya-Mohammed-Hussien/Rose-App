// src/app/[locale]/dashboard/page.tsx
export default function Page() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          <p>Dashboard main content goes here...</p>
        </div>

        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p>Latest orders or analytics...</p>
        </div>
      </div>
    </div>
  );
}

