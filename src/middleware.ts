import { NextRequest, NextResponse } from 'next/server';
import { getLocaleRedirect } from '@/middlewares/locale';

export async function middleware(request: NextRequest) {
  const response: NextResponse = getLocaleRedirect(request);
  
  return response;
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)', '/api/:path*'],
};
