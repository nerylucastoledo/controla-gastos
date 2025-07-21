"use server";

import { ResponseAPIOutput } from "../dto/apiDTO";

export default async function apiError(error: unknown): Promise<ResponseAPIOutput> {
  if (error instanceof Error) {
    return {
      ok: false,
      error: error.message,
      data: null
    };
  }

  return {
    ok: false,
    error: "Ocorreu um erro desconhecido.",
    data: null
  };
}