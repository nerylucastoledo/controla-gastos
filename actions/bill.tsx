"use server";

import { FETCH_EXPENSES_DATA } from "@/utils/api";
import apiError from "../utils/api-error";

// Funcao generica que recebe a tipage
export default async function bill(url: string) {
  try {
    const response = await FETCH_EXPENSES_DATA(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error: unknown) {
    return apiError(error);
  }
};