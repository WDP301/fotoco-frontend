import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow, isThisYear } from 'date-fns';
import { vi as dateFnsVi, enUS } from 'date-fns/locale';

import { Locale } from './define';
import en from '../dictionaries/en.json';
import vi from '../dictionaries/vi.json';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateFormatted = (
  params: string,
  locale: 'en' | 'vi' = 'en'
) => {
  const date = new Date(params);
  const dateFormat = isThisYear(date) ? 'd MMM, HH:mm' : 'd MMM, yyyy, HH:mm';
  const dateFnsLocale = locale === 'vi' ? dateFnsVi : enUS;
  return format(date, dateFormat, { locale: dateFnsLocale });
};

const dictionaries = { en, vi };

export const getDictionary = (locale?: Locale) => {
  const selectedLocale = locale || 'en';
  return dictionaries[selectedLocale];
};

export const base64Decode = (str: string) => {
  // Convert Base64 encoded bytes to percent-encoding, and then get the original string.
  const percentEncodedStr = atob(str.replace(/_/g, '/').replace(/-/g, '+'))
    .split('')
    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join('');
  return decodeURIComponent(percentEncodedStr);
};
