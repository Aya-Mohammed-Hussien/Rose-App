import { Sidebar } from './_components/sidebar/sidebar';
import { useLocale } from 'next-intl';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const locale = useLocale();

  return (
    <div className="flex min-h-screen bg-[#fafafa]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* SIDEBAR */}
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>

      {/* CONTENT */}
      <main className="flex-1 overflow-y-auto px-8 py-6">{children}</main>
    </div>
  );
}
