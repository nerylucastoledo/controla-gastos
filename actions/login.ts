"use server";

import { redirect } from 'next/navigation'
import { cookies } from "next/headers";

import { TOKEN_POST } from "@/app/api";
import { LoginInput } from "@/app/dto/authDTO";
import apiError from "@/app/utils/api-error";

const setCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

export default async function login(state: {}, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let data;

  try {
    const body: LoginInput = { email, password };

    const response = await TOKEN_POST("login", body)
    data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    
    await setCookie("token", data.token);
  } catch (error: unknown) {
    return apiError(error);
  }

  redirect("/");
};