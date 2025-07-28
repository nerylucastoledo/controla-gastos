"use server";

import { FETCH_GET, FETCH_POST } from "@/utils/api";
import apiError from "../utils/api-error";
import { BillInput } from "@/dto/billDTO";
import { Category } from "@/dto/categoryDTO";

export async function bill(url: string,) {
  try {
    const response = await FETCH_GET(url, ["collection"]);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message);
    }
    
    return data.data;
  } catch (error: unknown) {
    return apiError(error);
  }
};

export async function billPost(state: {}, formData: FormData) {
  const people = formData.get("people") as string;
  const card = formData.get("card") as string;
  const value = formData.get("value") as string;
  const item = formData.get("item") as string;
  const month = formData.get("month") as string;
  const year = formData.get("year") as string;
  const category = formData.get("category") as unknown;
  const installments = formData.get("installments") as number | null;

  try {
    const body: BillInput = { people, card, value, item, date: `${month}${year}`, category: category as Category, installments: Number(installments) ?? 1 };

    const response = await FETCH_POST("expenses", body);
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