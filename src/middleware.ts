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
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)', '/api/:path*'],
};
