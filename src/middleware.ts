import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('auth_token')?.value;
  const adminToken = process.env.ADMIN_TOKEN;

  // If the user is trying to access the dashboard without a valid token, redirect to login
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    if (!authToken || authToken !== adminToken) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If the user is authenticated and tries to access the login page, redirect to the dashboard
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    if (authToken && authToken === adminToken) {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/dashboard/:path*', '/admin/login'],
};