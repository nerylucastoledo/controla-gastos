"use server";

import { FETCH_DELETE } from "@/utils/api";
import apiError from "@/utils/api-error";
import { revalidateTag } from "next/cache";

export default async function deleteInvoice(url: string) {
  try {
    const response = await FETCH_DELETE(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    revalidateTag("collection")

    return {
      ok: true,
      error: '',
      data: {},
    }
  } catch (error: unknown) {
    return apiError(error);
  }
};