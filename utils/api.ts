"use server";

import { cookies } from "next/headers";
import { LoginInput, RegisterInput } from "../dto/authDTO";

export async function TOKEN_POST(url: string, body: LoginInput | RegisterInput ) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return response;
}

export async function FETCH_EXPENSES_DATA(url: string ) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses/${url}`, {
    method: "GET",
    headers: {
      "Authorization": `${token?.value}`
    }
  });
  return response;
}