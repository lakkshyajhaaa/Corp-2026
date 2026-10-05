import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login');
    const isAdminPage = req.nextUrl.pathname.startsWith('/_sys_admin_7789');
    const isTeamPage = req.nextUrl.pathname.startsWith('/team');

    if (isAuthPage) {
      if (isAuth) {
        if (token.role === 'ADMIN' || token.role === 'SUPER_ADMIN') {
          return NextResponse.redirect(new URL('/_sys_admin_7789', req.url));
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
      const allowedAdminEmail = process.env.ADMIN_EMAIL;
      const isEmailAuthorized = !allowedAdminEmail || token?.email?.toLowerCase() === allowedAdminEmail.toLowerCase();
      if ((token?.role !== 'ADMIN' && token?.role !== 'SUPER_ADMIN') || !isEmailAuthorized) {
        // Team member or unauthorized email trying to access admin
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
  matcher: ['/team/:path*', '/_sys_admin_7789/:path*', '/login'],
};
