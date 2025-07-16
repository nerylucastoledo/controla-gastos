"use server";

import { FETCH_EXPENSES_DATA } from "@/app/api";
import apiError from "@/app/utils/api-error";

export default async function bill(url: string) {
  try {
    const response = await FETCH_EXPENSES_DATA(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      ok: true,
      error: "",
      data: data.data,
    }
  } catch (error: unknown) {
    return apiError(error);
  }
};