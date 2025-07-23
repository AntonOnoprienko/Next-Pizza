import { NextRequest, NextResponse, userAgent } from 'next/server';

export function middleware(request: NextRequest) {
  const { device } = userAgent(request);
  const viewport = device.type || 'desktop';

  const response = NextResponse.next();

  response.cookies.set('viewport', viewport, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|static).*)'],
};