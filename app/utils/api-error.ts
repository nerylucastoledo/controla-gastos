import { ResponseAPIOutput } from "../dto/fetch";

export default function apiError(error: unknown): ResponseAPIOutput {
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