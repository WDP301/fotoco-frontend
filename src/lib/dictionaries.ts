import 'server-only';
import { Locale } from './define';
import { cookies } from 'next/headers';
import { cache } from 'react';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  vi: () => import('../dictionaries/vi.json').then((module) => module.default),
};

export const getDictionary = cache(async (locale?: Locale) => {
  if (locale) {
    return dictionaries[locale]();
  }
  const cookieStore = cookies();
  const langCookie = cookieStore.get('lang');
  const lang = (langCookie ? langCookie.value : 'en') as Locale;
  return dictionaries[lang]();
});
