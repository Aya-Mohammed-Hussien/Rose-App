import {getRequestConfig} from 'next-intl/server';
import { routing } from './routing';
import { hasLocale } from 'next-intl';
 
export default getRequestConfig(async ({requestLocale}) => {
  const requestedLocal = await requestLocale;
  // Variables
  const locale = hasLocale(routing.locales, requestedLocal)
    ? requestedLocal
    : routing.defaultLocale;
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});