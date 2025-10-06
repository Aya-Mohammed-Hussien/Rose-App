import Providers from "@/components/providers";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { setRequestLocale } from "next-intl/server";
import {getTranslations} from 'next-intl/server';

// Fonts
const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Types 
type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

// Meta Data 
export async function generateMetadata({params : {locale} }:Pick<LayoutProps , "params">) {
  const t = await getTranslations({locale});
  return {
    title: t('title'),
      }
  };

export default function LocaleLayout({children,params: { locale },}: LayoutProps) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

// Enable static rendering
setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
