import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/', '/new-expense', '/new-option', '/config'],
}