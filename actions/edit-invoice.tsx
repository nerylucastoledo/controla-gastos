"use server";

import { FETCH_EDIT } from "@/utils/api";
import apiError from "@/utils/api-error";
import { EditInvoiceInput } from "@/dto/invoiceDTO";
import { Category } from "@/dto/categoryDTO";
import { revalidateTag } from "next/cache";

export default async function editInvoice(state: {}, formData: FormData) {
  const _id = formData.get("id") as string;
  const item = formData.get("item") as string;
  const value = formData.get("value") as string;
  const category = formData.get("category") as unknown;

  try {
    const body: EditInvoiceInput = { _id, item, value, category: category as Category };

    const response = await FETCH_EDIT("/expenses", body);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    revalidateTag("collection");
    
    return {
      ok: true,
      error: '',
      data: {},
    }
  } catch (error: unknown) {
    return apiError(error);
  }
};