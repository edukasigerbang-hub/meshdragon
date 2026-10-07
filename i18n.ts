import { getRequestConfig } from 'next-intl/server';
import { defaultLocale, locales } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale =
    locales.find((supportedLocale) => supportedLocale === requestedLocale) ??
    defaultLocale;

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});