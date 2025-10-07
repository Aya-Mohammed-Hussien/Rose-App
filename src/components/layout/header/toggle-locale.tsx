"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function ToggleLocale() {
  // Translation
  const locale = useLocale();
  console.log("toggledLocale" , locale);

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Toggle-locale function
  const toggleLocale = () => {
    router.push(`${pathname}${location.search}`, {
      locale: locale === "ar" ? "en" : "ar",
    });
  };

  return (
    <button
      onClick={toggleLocale}
      className="font-normal text-base ps-4 py-4 text-zinc-700 border-s border-zinc-700 dark:text-zinc-50 dark:border-zinc-50">
      {locale === "ar" ? "English" : "العربية"}
    </button>
  );
}
