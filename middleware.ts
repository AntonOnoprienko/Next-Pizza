import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  const isMobilePhone = /Mobi|Android.*Mobile|iPhone|iPod/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);

  const response = NextResponse.next();
  response.cookies.set('isMobilePhone', isMobilePhone.toString());
  response.cookies.set('isTablet', isTablet.toString());
  return response;
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico|api).*)'],
};
