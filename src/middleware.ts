import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import authConfig from '@/auth.config';
import { routes } from '@/lib/routes';

export const { auth: authMiddleware } = NextAuth(authConfig);
export default authMiddleware((request) => {
  const { nextUrl } = request;
  const currentUrlPath = nextUrl.pathname;
  const isLoggedIn = !!request.auth;

  const isApiRoute = routes.apiPrefix.startsWith(currentUrlPath);
  const isPublicRoute = routes.publicRoutes.includes(currentUrlPath);
  const isAuthRoute = routes.authRoutes.includes(currentUrlPath);

  if (isApiRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(routes.defaultRedirect, nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
