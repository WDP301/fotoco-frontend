import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from './lib/action';
import { base64Decode } from './lib/utils';
import { UserJWT } from './lib/define';

const MAX_AGE_REFRESH_TOKEN = process.env.MAX_AGE_REFRESH_TOKEN
  ? +process.env.MAX_AGE_REFRESH_TOKEN
  : 60 * 60 * 24 * 30;

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)', '/api/:path*'],
};

const apiRequireAuth = ['/api/auth/update-token'];

const urlRequireAuthenticated = [
  '/groups',
  '/groups/*',
  '/albums',
  '/albums/*',
  '/photos/*',
];

const urlRequireUnauthenticated = ['/login', '/register', '/active/*'];

function isValidUrl(route: string, urlList: string[]) {
  return urlList.some((pattern) => {
    const regex = new RegExp('^' + pattern.split('*').join('.*') + '$');
    return regex.test(route);
  });
}

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const accessToken = req.cookies.get('access-token');
  const refreshToken = req.cookies.get('refresh-token');
  const signature = req.cookies.get('signature')?.value || '';

  if (
    refreshToken &&
    !accessToken &&
    !isValidUrl(pathname, ['/logout', '/logout-all'])
  ) {
    try {
      const { accessToken: newAccessToken } = await refreshAccessToken(
        refreshToken.value,
        signature
      );
      const response = NextResponse.next();

      const payload = base64Decode(newAccessToken.split('.')[1]);
      const user = JSON.parse(payload) as UserJWT;

      response.cookies.set('signature', signature, {
        httpOnly: true,
        maxAge: MAX_AGE_REFRESH_TOKEN,
      });
      const expiryDate = new Date(user.exp * 1000);
      response.cookies.set('access-token', newAccessToken, {
        httpOnly: true,
        expires: expiryDate,
      });
      return response;
    } catch (error) {
      console.log(error);
      return Response.redirect(new URL('/logout', req.nextUrl));
    }
  }

  // Check if the request is for an URL that requires unauthenticated
  if (isValidUrl(pathname, urlRequireUnauthenticated)) {
    if (accessToken) {
      return Response.redirect(new URL(callbackUrl, req.nextUrl));
    }
  }

  // Check if the request is for an URL that requires authenticated
  if (isValidUrl(pathname, urlRequireAuthenticated)) {
    if (!accessToken) {
      const absoluteUrl = new URL(req.nextUrl);
      absoluteUrl.pathname = '/login';
      absoluteUrl.searchParams.set('callbackUrl', req.nextUrl.pathname);
      return Response.redirect(absoluteUrl.toString());
    }
  }

  // Check if the request is for an API route that requires authentication
  if (isValidUrl(pathname, apiRequireAuth)) {
    if (!accessToken) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
        },
        { status: 401 }
      );
    }
  }
}
