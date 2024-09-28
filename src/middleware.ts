import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';

const locales = ['en', 'vi'];

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const headers = { 'accept-language': acceptLanguage };
  const negotiator = new Negotiator({ headers });
  const language = negotiator.languages(locales);
  return language[0] || 'en'; // Fallback to English if no match
}

export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)', '/api/:path*'],
};
