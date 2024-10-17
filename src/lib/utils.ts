import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isThisYear, formatDistanceToNow } from 'date-fns';
import { vi as dateFnsVi, enUS } from 'date-fns/locale';

import { Locale } from './define';
import en from '../dictionaries/en.json';
import vi from '../dictionaries/vi.json';
import { ReadonlyURLSearchParams } from 'next/navigation';

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

export const getFormatDistanceToNow = (
  params: string,
  locale: 'en' | 'vi' = 'en'
) => {
  if (!params) return '';
  const date = new Date(params);
  const dateFnsLocale = locale === 'vi' ? dateFnsVi : enUS;
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: dateFnsLocale,
  });
};

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  return `${pathname}${queryString}`;
};

const dictionaries = { en, vi };

export const getDictionary = (locale?: Locale) => {
  const selectedLocale = locale || 'en';
  return dictionaries[selectedLocale];
};

export const formatNumber = (num: number) => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

export const base64Decode = (str: string) => {
  // Convert Base64 encoded bytes to percent-encoding, and then get the original string.
  const percentEncodedStr = atob(str.replace(/_/g, '/').replace(/-/g, '+'))
    .split('')
    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
    .join('');
  return decodeURIComponent(percentEncodedStr);
};

export const openCenteredWindowPopup = (
  url: string,
  options: {
    title?: string;
    w?: number;
    h?: number;
  } = {}
) => {
  const { title = 'Fotoco', w = 1200, h = 600 } = options;

  const dualScreenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const dualScreenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const width = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : screen.width;
  const height = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : screen.height;

  const systemZoom = width / window.screen.availWidth;
  const left = (width - w) / 2 / systemZoom + dualScreenLeft;
  const top = (height - h) / 2 / systemZoom + dualScreenTop;
  return window.open(
    url,
    title,
    `
    scrollbars=yes,
    width=${w},
    height=${h},
    top=${top},
    left=${left}
    `
  );
};

export const interpolateString = (
  template: string,
  variables: Record<string, string>
) => {
  return template.replace(
    /{{(.*?)}}/g,
    (_, key) => variables[key.trim()] || ''
  );
};
