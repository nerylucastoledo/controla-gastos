"use server";

import { cookies } from "next/headers";

import { TOKEN_POST } from "@/utils/api";
import { LoginInput } from "../dto/authDTO";
import apiError from "@/utils/api-error";

const setCookie = async (name: string, value: string) => {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
}

export default async function login(state: {}, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const body: LoginInput = { email, password };

    const response = await TOKEN_POST("login", body);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    
    await setCookie("token", data.token);
    return {
      ok: true,
      error: '',
      data: data,
    }
  } catch (error: unknown) {
    return apiError(error);
  }
};