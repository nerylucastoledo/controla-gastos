import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = request.cookies.get("token")?.value;
  const isPublicPaths = ["/login", "/register"];

  if (!isPublicPaths.includes(request.nextUrl.pathname) && token && token.split('.').length !== 3) {
    cookieStore.delete("token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const currentTime = Date.now() / 1000
  const decodedToken = token ? jwtDecode(token) as { exp: number } : null;

  if (decodedToken && decodedToken.exp < currentTime) {
    cookieStore.delete("token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isPublicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !isPublicPaths.includes(request.nextUrl.pathname)) {
    cookieStore.delete("token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/register', '/new-expense', '/new-card', '/account'],
}