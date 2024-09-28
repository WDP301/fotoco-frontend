import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Locale } from './define';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  vi: () => import('../dictionaries/vi.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
