import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

const LOCALES = ['en', 'vi'];

/**
 * This function takes a NextRequest and modifies its url to include the locale
 * in the path. If the path already contains a locale, it does nothing. If the
 * path does not contain a locale, it appends the locale to the path. The locale
 * is determined by the client's Accept-Language header.
 *
 * For example, if the request is to /about and the client's Accept-Language is
 * en-US, the function will modify the request to /en/about.
 *
 * @param request The NextRequest to modify.
 * @returns The modified NextRequest.
 */
export function getLocaleRedirect(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;
  const isNextUrlHasLocalePath = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!isNextUrlHasLocalePath) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const headers = { 'accept-language': acceptLanguage };

    const negotiator = new Negotiator({ headers });
    const language = negotiator.languages(LOCALES)[0] ?? 'en';
    
    request.nextUrl.pathname = `/${language}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}