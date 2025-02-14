import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const { pathname } = request.nextUrl
  const isLoginORegister = pathname === "/login" || pathname === "/register"

  if (token && isLoginORegister) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && isLoginORegister) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/', '/new-expense', '/new-option', '/config', '/login', '/register'],
}