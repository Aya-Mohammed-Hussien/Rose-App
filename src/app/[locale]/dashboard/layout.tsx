// src/app/[locale]/dashboard/layout.tsx
import { Sidebar } from './_components/sidebar/sidebar';
import { useLocale } from 'next-intl';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale(); // next-intl hook

  return (
    <div className="flex" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <Sidebar />

      {/* Dashboard content */}
      <main className="flex-1 p-6 bg-[#fafafa] min-h-screen">{children}</main>
    </div>
  );
}
