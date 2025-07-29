"use server";

import { FETCH_EDIT } from "@/utils/api";
import apiError from "../utils/api-error";
import { parseCurrencyString } from "@/utils";

export async function salaryUpdate(state: {}, formData: FormData) {
  const salary = formData.get("salary") as string;

  try {
    const body = { salary: parseCurrencyString(salary) }

    const response = await FETCH_EDIT<{ salary: number }>("users/", body);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    
    return {
      ok: true,
      error: '',
      data: data,
    }
  } catch (error: unknown) {
    return apiError(error);
  }
};
