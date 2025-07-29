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

export async function FETCH_POST<T>(url: string, body: T) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token?.value}`
    },
    body: JSON.stringify(body)
  });
  return response;
}

export async function FETCH_GET(url: string, tags: string[] = []) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: "GET",
    next: { tags },
    headers: {
      "Authorization": `${token?.value}`
    }
  });
  return response;
}

export async function FETCH_EDIT<T>(url: string, body: T) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${token?.value}`
    },
    body: JSON.stringify(body),
  });

  return response;
}

export async function FETCH_DELETE(url: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
    method: "DELETE",
    headers: {
      "Authorization": `${token?.value}`
    },
  });

  return response;
}