import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const username = request.cookies.get('username')?.value;

  if (url.pathname.startsWith('/order') && !username) {
    url.pathname = '/404';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/order/:path*'],
};