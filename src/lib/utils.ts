import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isThisYear, formatDistanceToNow } from 'date-fns';
import { vi as dateFnsVi, enUS } from 'date-fns/locale';

import { Locale } from './define';
import en from '../dictionaries/en.json';
import vi from '../dictionaries/vi.json';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { getImageSize } from 'react-image-size';

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
  return template?.replace(
    /{{(.*?)}}/g,
    (_, key) => variables[key.trim()] || ''
  );
};

export const fetchPhotoSize = async (url: string) => {
  const dimensions = await getImageSize(url)
    .then((size) => {
      return {
        width: size.width,
        height: size.height,
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        width: 0,
        height: 0,
      };
    });
  return dimensions;
};

export function getPath(obj: any, path: any) {
  return path.split('.').reduce((acc: any, key: any) => acc && acc[key], obj);
}

export function convertTimeToSecond(value: number, unit: string) {
  switch (unit) {
    case 'days':
      return value * 60 * 60 * 24;
    case 'weeks':
      return value * 60 * 60 * 24 * 7;
    case 'months':
      return value * 60 * 60 * 24 * 30;
    default:
      return value;
  }
}

const VIEW_HISTORY_KEY = 'photoViewHistory';
const MAX_HISTORY_LENGTH = 300;

export function addToPhotoViewHistory(photoId: string) {
  const history = JSON.parse(localStorage.getItem(VIEW_HISTORY_KEY) || '[]');
  const timestamp = new Date().toISOString();
  const filteredHistory = history.filter(
    (entry: any) => entry.photoId !== photoId
  );
  filteredHistory.push({ photoId, viewedAt: timestamp });
  const updatedHistory = filteredHistory.slice(-MAX_HISTORY_LENGTH);
  localStorage.setItem(VIEW_HISTORY_KEY, JSON.stringify(updatedHistory));
}

export function getPhotoViewHistory(dateFrom?: Date, dateTo?: Date) {
  const history = JSON.parse(localStorage.getItem(VIEW_HISTORY_KEY) || '[]');
  const fromDate = dateFrom ? dateFrom : new Date(0);
  const toDate = dateTo ? dateTo : new Date();

  console.log(
    '>>>>>>>',
    history.filter((entry: any) => {
      const viewedAt = new Date(entry.viewedAt);
      return viewedAt >= fromDate && viewedAt <= toDate;
    })
  );

  return history.filter((entry: any) => {
    const viewedAt = new Date(entry.viewedAt);
    console.log('>>>>>>>>>>>>>>>', viewedAt, fromDate, toDate);
    return viewedAt >= fromDate && viewedAt <= toDate;
  });
}
