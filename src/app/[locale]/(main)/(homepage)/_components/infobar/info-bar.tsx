import { Truck, RefreshCw, ShieldCheck, Headset } from "lucide-react";

export function InfoBar() {


//variables  
  const features = [
  {
    id: 1,
    icon: Truck,
    title: "Free Delivery",
    desc: "For orders above 120 EGP",
  },
  {
    id: 2,
    icon: RefreshCw,
    title: "Get Refund",
    desc: "Refunds within 30 days",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Safe Payment",
    desc: "100% Secure Payment",
  },
  {
    id: 4,
    icon: Headset,
    title: "24/7 Support",
    desc: "Contact us at any time",
  },
];

  return (
    // ✅ Added container for layout consistency
    <div className="container mx-auto  rounded-md p-7 bg-[#fcebea]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {features.map((item) => (
          // ✅ Use a stable unique key instead of index
          <div
            key={item.id}
            className="flex items-center gap-4 w-full max-w-xs h-16 rounded-md p-4"
            aria-label={`Feature: ${item.title}`}
          >
            {/* ✅ Clean, minimal element without extra wrappers */}
            <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-[#A52424] before:absolute before:inset-0 before:rounded-full before:bg-[#A52424]/90 before:-z-10">
              <item.icon className="w-8 h-8 text-white" />
            </div>

            {/* ✅ Text casing handled via Tailwind */}
            <div>
              <h3 className="font-semibold text-base text-[#A6252A] capitalize">
                {item.title}
              </h3>
              <p className="text-sm opacity-90 text-[#71717A] capitalize">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
