import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log('All cookies:', request.cookies);
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/new-expense', '/new-option', '/config'],
}