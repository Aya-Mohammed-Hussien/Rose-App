import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { hasLocale } from 'next-intl';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocal = await requestLocale;

  // Variables
  const locale = hasLocale(routing.locales, requestedLocal)
    ? requestedLocal
    : routing.defaultLocale;

  // Define reusable flag for Arabic
  const isArabic = locale === 'ar';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    
    formats: {
      // Number formats
      number: {
        decimal: {
          minimumFractionDigits: 0,
          numberingSystem: isArabic ? 'arab' : 'latn',
        },

        // Currency formats
        currency: {
          style: 'currency',
          currency: 'EGP',
          currencyDisplay: isArabic ? 'symbol' : 'code',
          numberingSystem: isArabic ? 'arab' : 'latn',
        },
      },
    },
  };
});
