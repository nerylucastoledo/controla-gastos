"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from "next/link";

import styles from "../styles/pages/login.module.scss"

import wallet from "../images/wallet.png";
import walletRetina from "../images/wallet-retina.png";
import Toast from "../components/toast/toast";
import { Input } from "../components/input/input";
import { fetcherPost, formatCurrency } from "../utils";

interface IData {
  email: string;
  name: string;
  salary: string;
  password: string;
  username: string;
}

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("R$ 0,00");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});
  const common = { alt: 'wallet', width: 216, height: 288, loading: "eager" };

  const handleToast = (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000);
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newiD = Math.random().toString(16).slice(2)
      const username = name.split(" ")[0] + newiD;
      const body = { email, name, salary, password, username }

      const response = await fetcherPost<IData, { message: string }>(
        "http://localhost:4000/api/register",
        "POST", 
        body
      );
      
      const { message } = response;
      handleToast(true, message)
      router.replace("/login");
      
    } catch (err) {
      handleToast(false, (err as Error).message)
    }
  }

  return (
    <div className={styles.background}>
      {showToast && (
        <Toast success={toastCustom.error} message={toastCustom.message} />
      )}

      <div className={styles.container_user}>
        <div className={styles.container_user__info}>
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet={walletRetina.src} />
            <Image {...common} src={wallet.src} />
          </picture>
          <p>Ao se cadastrar você vai conseguir ter maior controle dos seus gastos, visualizar onde você mais está gastando e quanto cada pessoa deve te passar no final do mês, caso você empreste seu cartão.</p>
        </div>
        
        <div className={`${styles.form_register} ${styles.container_user__form}`}>
          <h1 className={styles.container_user__form_title}>Criar uma conta</h1>
          <p className={styles.container_user__form_subtitle}>Coloque seus dados</p>

          <form onSubmit={submit}>
            <Input
              label="Email"
              type="email" 
              placeholder=""
              required
              name="email"
              role="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <Input
              label="Nome"
              type="text" 
              placeholder=""
              required
              name="name"
              role="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />

            <Input
              label="Salário"
              type="text" 
              placeholder=""
              required
              name="salary"
              role="salary"
              value={salary}
              onChange={({ target }) => setSalary(formatCurrency(target.value))}
            />

            <Input
              label="Senha"
              type="password" 
              placeholder=""
              required
              name="password"
              role="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            <input type="submit" value="Cadastrar" className="button button__primary"/>
          </form>

          <p className={styles.container_user__form_new}>Já possui conta? <Link href="/login">Acesse</Link></p>
        </div>
      </div>
    </div>
  );
}
