import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login", "/register"]

const REDIRECT_URL = "/login"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const publicRoute = publicRoutes.find(route => route === path)
  const authToken = request.cookies.get("access_token")

  console.log(request)

  return NextResponse.next();

  if (!authToken && publicRoute) {
    return NextResponse.next();
  }

  if (!authToken && !publicRoute) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = REDIRECT_URL

    return NextResponse.redirect(redirectUrl);
  }

  if (authToken && !publicRoute) {
  }
}

export const config = {
  matcher: [],
}