"use server";

import { TOKEN_POST } from "../utils/api";
import { RegisterInput } from "../dto/authDTO";
import { parseCurrencyString } from "../utils";
import apiError from "../utils/api-error";
import login from "./login";
import { redirect } from "next/navigation";

const generateUsername = (name: string): string => {
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${name.toLowerCase().replace(/\s+/g, '')}${randomNumber}`;
};

const validateRequiredFields = (email: string, name: string, salary: string, password: string) => {
  if (!email || !name || !salary || !password) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  if (name.length < 3) {
    throw new Error("O nome deve ter pelo menos 3 caracteres.");
  }

  if (salary && parseCurrencyString(salary) <= 1) {
    throw new Error("Salário deve ser maior que R$ 1,00.");
  }

  if (password.length < 6) {
    throw new Error("A senha deve ter pelo menos 6 caracteres.");
  }
};

export default async function register(state: {}, formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const salary = formData.get("salary") as string;
  const password = formData.get("password") as string;

  try {
    validateRequiredFields(email, name, salary, password);

    const salaryAsNumber = parseCurrencyString(salary);
    const username = generateUsername(name.trim());

    const body: RegisterInput = { 
      email: email.trim(),
      password: password.trim(),
      salary: salaryAsNumber,
      name: name,
      username: username.trim()
    };

    const response = await TOKEN_POST("register", body)
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    
    const { ok } = await login(state, formData);
    
    if (!ok) {
      throw new Error("Erro ao fazer login, tente novamente.");
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
