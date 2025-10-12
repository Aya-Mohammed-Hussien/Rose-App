import Providers from '@/components/providers';
import { routing } from '@/i18n/routing';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { Sarabun, Tajawal } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

// Generate static params for each layout
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Fonts
// Sarabun English Font
const sarabun = Sarabun({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],

  variable: '--font-sarabun',
  display: 'swap',
});

// Tajawal Arabic Font
const tajawal = Tajawal({
  variable: '--font-tajawal',
  subsets: ['arabic'],
  display: 'swap',
  weight: ['400', '500', '700', '800'],
});

// Types
type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

// Meta Data
export async function generateMetadata({ params: { locale } }: Pick<LayoutProps, 'params'>) {
  const t = await getTranslations({ locale });
  return {
    title: t('title'),
  };
}

export default function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body
        className={`antialiased ${locale === 'ar' ? `${tajawal.variable} font-tajawal` : `${sarabun.variable} font-sarabun`}`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
