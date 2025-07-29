"use server";

import { FETCH_DELETE, FETCH_EDIT } from "@/utils/api";
import apiError from "../utils/api-error";
import { parseCurrencyString } from "@/utils";
import { revalidateTag } from "next/cache";
import { PeopleDTOUpdate } from "@/dto/peopleDTO";
import { CardDTOUpdate } from "@/dto/cardDTO";

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

export async function deletePeopleOrCard(url: string) {
  try {
    const response = await FETCH_DELETE(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    revalidateTag("user");

    return {
      ok: true,
      error: '',
      data: {},
    }
  } catch (error: unknown) {
    return apiError(error);
  }
};

export async function editPeopleOrCard(state: {}, formData: FormData) {
  const _id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const color = formData.get("color") as string | null;
  
  try {
    const body = color 
      ? { _id, name, color } as CardDTOUpdate
      : { _id, name } as PeopleDTOUpdate;
  
    const endpoint = color ? "cards" : "peoples";
    const response = await FETCH_EDIT<CardDTOUpdate | PeopleDTOUpdate>(`/${endpoint}`, body);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    revalidateTag("user");
    
    return {
      ok: true,
      error: '',
      data: {},
    }
  } catch (error: unknown) {
    return apiError(error);
  }
};