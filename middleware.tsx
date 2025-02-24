import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let lastToken = ""

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token && !lastToken) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token`, { method: "GET" });
      const data = await res.json();
      const newToken = data.token;

      if (newToken.message || newToken === undefined || !newToken.length) {
        throw new Error();
      }

      lastToken = newToken
      return NextResponse.next();
    } catch (error) {
      console.log("Erro ao buscar o token:", error);
      cookieStore.delete("access_token")
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/new-expense', '/new-option', '/config'],
}