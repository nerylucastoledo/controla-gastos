"use client"

import { useUser } from "../context/user";
import { useState } from "react";
import Link from "next/link";

import styles from "../styles/pages/home.module.scss";
import stylesNewExpense from "../styles/pages/new-expense.module.scss";

import { IoFastFoodOutline } from 'react-icons/io5'

import { Input } from "../components/input/input";
import { Select } from "../components/select/select";
import Toast from "../components/toast/toast";

import { fetcherPost } from "../utils";

interface IData {
  _id?: string;
  color?: string;
  name: string;
  username: string;
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
      const body: IData = {
        username,
        name,
        ...(type === "cards" ? { color } : {})
      };

      const response = await fetcherPost<IData, { message: string }>(
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
        <Toast message={toastCustom.message} success={toastCustom.error} />
      )}
      <div className={styles.container_home}>
        <Link href={"/"}>
					<IoFastFoodOutline size={60}/>
				</Link>

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
