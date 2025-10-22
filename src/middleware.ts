import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Auth & Public Routes
const authRoutes = ['/login', '/register', '/forgot-password', '/verify-otp'];
const publicRoutes = [...authRoutes, '/products', '/'];

// Locale Detection
const intlMiddleWare = createMiddleware(routing);

export default async function middelware(request: NextRequest) {
  const response = intlMiddleWare(request);
  const pathname = request.nextUrl.pathname;
  const pathnameWithoutLocale = '/' + pathname.split('/').slice(2).join('/') || '/';
  const token = await getToken({ req: request });

  //1- If the requested route is protected
  if (!publicRoutes.includes(pathnameWithoutLocale)) {
    // - Authenticated user , proceed
    if (token) return response;

    // - Unauthenticated , redirect to login
    const redirectUrl = new URL('/login', request.nextUrl.origin);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 2- If the requested route is an auth route
  if (authRoutes.includes(pathnameWithoutLocale)) {
    // - Unauthenticated , Proceed
    if (!token) return response;

    // - Authenticated , redirect to homapage
    const redirectUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  // 3- If the requested route is public
  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
