"use client"

import { useUser } from "../../context/user";
import { useCallback, useState } from "react";

import styles from "../../styles/pages/home.module.scss";
import stylesNewExpense from "../../styles/pages/new-expense.module.scss";

import { Input } from "../../components/input/input";
import { Select } from "../../components/select/select";
import { Toast } from "../../components/toast/toast";

import { fetcherPost } from "../../utils";
import { useAuth } from "@/app/context/auth";
import { ResponseErrorOutput, ResponseOutput } from "@/app/dto/fetch";
import { NewOptionInput } from "@/app/dto/newOptionDTO";

export default function NewOption() {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#000000");
  const [type, setType] = useState("");
  const [toast, setToast] = useState<{ success: boolean; message: string } | null>(null);

  const { username } = useUser();
  useAuth()

  const resetOptions = useCallback(() => {
    setName("")
    setColor("")
    setType("")
  }, []) 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body: NewOptionInput = {
        username,
        name,
        ...(type === "cards" ? { color } : {})
      };

      const response = await fetcherPost<NewOptionInput, ResponseOutput | ResponseErrorOutput>(
        `${process.env.NEXT_PUBLIC_API_URL}/${type}`, 
        "POST", 
        body
      );

      if ("error" in response) {
        throw new Error(response.message)
      }

      setToast({ success: true, message: response.message })
      resetOptions()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Ocorreu um erro inesperado.";
      setToast({ success: false, message: message })
    }
  }

  return (
    <section className={`container ${stylesNewExpense.new_expense}`}>
      <Toast 
        success={toast?.success}
        message={toast?.message}
        show={toast ? true : false}
        setShowToast={setToast}
      />
      
      <div className={styles.container_home}>
        <form onSubmit={handleSubmit}>
          <h1 className="title">Cadastre a opção</h1>

          <Select 
            data-testid="name-select" 
            id='type' 
            label='O que?' 
            onChange={({ target }) => setType(target.value)}
            required
            value={type}
          >
            <option value={""} disabled>Selecione</option>
            <option value={"peoples"}>Pessoa</option>
            <option value={"cards"}>Cartão</option>
          </Select>

          <Input
            data-testid="name"
            label="Nome"
            name="name"
            onChange={({ target }) => setName(target.value)}
            type="text" 
            required
            value={name}
          />

          {type === "cards" && (
            <Input
              data-testid="cor"
              label="Cor"
              name="color"
              onChange={({ target }) => setColor(target.value)}
              required
              type="color" 
              value={color}
            />
          )}
          
          <input type="submit" value="Cadastrar" className="button button__primary" />
        </form>
      </div>
    </section>
  );
}
