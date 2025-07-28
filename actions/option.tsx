"use server";

import { FETCH_POST } from "@/utils/api";
import apiError from "../utils/api-error";
import { PeopleDTOInput } from "@/dto/peopleDTO";
import { CardDTOInput } from "@/dto/cardDTO";

export async function optionPost(state: {}, formData: FormData) {
  const name = formData.get("name") as string;
  const color = formData.get("color") as string;

  try {
    let response;

    if (color) {
      const body: CardDTOInput = { name, color };
      response = await FETCH_POST("cards", body);
    } else {
      const body: PeopleDTOInput = { name };
      response = await FETCH_POST("peoples", body);
    }

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