import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Locale } from './define';
import en from '../dictionaries/en.json';
import vi from '../dictionaries/vi.json';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dictionaries = { en, vi };

export const getDictionary = (locale?: Locale) => {
  const selectedLocale = locale || 'en';
  return dictionaries[selectedLocale];
};
