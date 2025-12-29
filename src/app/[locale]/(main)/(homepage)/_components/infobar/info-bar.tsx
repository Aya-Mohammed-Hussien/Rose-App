import { Truck, RefreshCw, ShieldCheck, Headset } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function InfoBar() {
  // Translations
  const t = useTranslations();
  //variables
  const features = [
    {
      id: 1,
      icon: Truck,
      title: t('free-delivery'),
      desc: t('for-orders-above-120-egp'),
    },
    {
      id: 2,
      icon: RefreshCw,
      title: t('get-refund'),
      desc: t('refunds-within-30-days'),
    },
    {
      id: 3,
      icon: ShieldCheck,
      title: t('safe-payment'),
      desc: t('100-secure-payment'),
    },
    {
      id: 4,
      icon: Headset,
      title: t('24-7-support'),
      desc: t('contact-us-at-any-time'),
    },
  ];

  return (
    <div className="mx-auto">
      <div className="mx-auto rounded-md p-7 bg-[#fcebea]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 w-full max-w-xs h-16 rounded-md p-4"
              aria-label={`Feature: ${item.title}`}
            >
              <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-[#A52424] before:absolute before:inset-0 before:rounded-full before:bg-[#A52424]/90 before:-z-10">
                <item.icon className="w-8 h-8 text-white" />
              </div>

              <div>
                <h3 className="font-semibold text-base text-[#A6252A] capitalize">{item.title}</h3>
                <p className="text-sm opacity-90 text-[#71717A] capitalize">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
