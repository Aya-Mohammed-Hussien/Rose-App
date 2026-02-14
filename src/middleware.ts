import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Auth & Public Routes
const authRoutes = ['/login', '/register', '/forget-password'];
const publicRoutes = ['/', '/products', '/cart'];
// Locale Detection
const intlMiddleWare = createMiddleware(routing);
export default async function middelware(request: NextRequest) {
  const response = intlMiddleWare(request);
  const pathname = request.nextUrl.pathname;
  const pathnameWithoutLocale = '/' + pathname.split('/').slice(2).join('/') || '/';
  const token = await getToken({ req: request });

  // 1-Auth routes
  if (authRoutes.includes(pathnameWithoutLocale)) {
    if (token) {
      // Authenticated users cannot visit login/register → redirect home
      return NextResponse.redirect(new URL('/', request.nextUrl.origin));
    } else {
      // Unauthenticated users can access login/register
      return response;
    }
  }

  // 2-Allow unauthenticated users to access public routes + product details
  if (
    publicRoutes.includes(pathnameWithoutLocale) ||
    pathnameWithoutLocale.startsWith('/products/')
  ) {
    return response;
  }

  // 3- Protect other routes ,redirect unauthenticated users
  if (!token) {
    // - Unauthenticated , redirect to login
    const redirectUrl = new URL('/login', request.nextUrl.origin);
    redirectUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // admin-only protection for dashboard
  // if (pathnameWithoutLocale.startsWith('/dashboard') && token.user.role !== 'admin') {
  //   return NextResponse.redirect(new URL('/unauthorized', request.nextUrl.origin));
  // }

  // 4- Authenticated users can access protected routes
  return response;
}
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
