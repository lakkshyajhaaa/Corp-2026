import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login');
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
    const isTeamPage = req.nextUrl.pathname.startsWith('/team');

    if (isAuthPage) {
      if (isAuth) {
        if (token.role === 'ADMIN' || token.role === 'SUPER_ADMIN') {
          return NextResponse.redirect(new URL('/admin', req.url));
        }
        return NextResponse.redirect(new URL('/team', req.url));
      }
      return null;
    }

    if (!isAuth && (isAdminPage || isTeamPage)) {
      let from = req.nextUrl.pathname;
      if (req.nextUrl.search) {
        from += req.nextUrl.search;
      }
      return NextResponse.redirect(new URL(`/login?from=${encodeURIComponent(from)}`, req.url));
    }

    if (isAdminPage) {
      if (token?.role !== 'ADMIN' && token?.role !== 'SUPER_ADMIN') {
        // Team member trying to access admin
        return NextResponse.redirect(new URL('/team', req.url));
      }
    }

    if (isTeamPage) {
      if (token?.role === 'ADMIN' || token?.role === 'SUPER_ADMIN') {
        // Admin trying to access team pages directly might be allowed, but usually they have their own dashboard
        // For now, allow or redirect to admin. Let's allow but maybe they shouldn't be here.
        // We'll leave it allowed for admins to view team pages.
      } else if (!token?.teamId) {
        // Team member with no team assigned
        // You might want a dedicated 'no-team' page
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // Let the middleware function handle the logic
    },
  }
);

export const config = {
  matcher: ['/team/:path*', '/admin/:path*', '/login'],
};
