import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

let lastToken = ""

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const token = cookieStore.get('access_token')

  if (!token && !lastToken) {
    await fetch("`https://controla-gastos-back.onrender.com/api/token", { method: "GET" })
    .then(async (res) => {
      const { token } = await res.json();

      if (token === undefined) {
        throw new Error()
      }

      lastToken = token;
      return NextResponse.next();
    }).catch(() => {
      return NextResponse.redirect(new URL('/login', request.url));
    });
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/new-expense', '/new-option', '/config'],
}
