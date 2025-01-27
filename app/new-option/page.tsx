"use client"

import styles from "../styles/pages/home.module.scss";
import stylesNewExpense from "../styles/pages/new-expense.module.scss";

import { IoFastFoodOutline } from 'react-icons/io5'

import { fetcherPost } from "../utils";

import { Input } from "../components/input/input";
import Link from "next/link";
import { useUser } from "../context/user";
import { useState } from "react";
import Toast from "../components/toast/toast";
import { Select } from "../components/select/select";

interface Body {
  _id?: string;
  username: string;
  name: string;
  color?: string;
}

export default function NewOption() {
  const { username } = useUser();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});
  const [showToast, setShowToast] = useState(false);

  const handleToast = (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000);
  }

  const resetOptions = () => {
    setName("")
    setColor("")
    setName("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body: Body = {
        username,
        name,
        ...(type === "cards" ? { color } : {})
      };

      const response = await fetcherPost<Body, { message: string }>(
        `http://localhost:4000/api/${type}`, 
        "POST", 
        body
      );
      handleToast(true, response.message)
      resetOptions()
    } catch (err) {
      handleToast(false, (err as Error).message);
    }
  }

  return (
    <section className={`container ${stylesNewExpense.new_expense}`}>
      {showToast && (
        <Toast success={toastCustom.error} message={toastCustom.message} />
      )}
      <div className={styles.container_home}>
        <Link href={"/"}>
					<IoFastFoodOutline size={60}/>
				</Link>

        <form onSubmit={handleSubmit}>
          <h1 className="title">Cadastre a opção</h1>

          <Select 
            id='type' 
            label='O que?' 
            data-testid="name-select" 
            value={type}
            onChange={({ target }) => setType(target.value)}
            required
          >
            <option value={""} disabled>Selecione</option>
            <option value={"peoples"}>Pessoa</option>
            <option value={"cards"}>Cartão</option>
          </Select>

          <Input
            label="Nome"
            type="text" 
            name="name"
            data-testid="name"
            required
            value={name}
            onChange={({ target }) => setName(target.value)}
          />

          {type === "cards" && (
            <Input
              label="Cor"
              type="color" 
              name="color"
              data-testid="cor"
              required
              value={color}
              onChange={({ target }) => setColor(target.value)}
            />
          )}
          <input type="submit" value="Cadastrar" className="button button__primary" />
        </form>
      </div>
    </section>
  );
}
