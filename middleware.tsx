import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')
  console.log('token:', token)
  console.log('All cookies:', request.cookies);
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/new-expense', '/new-option', '/config'],
}
