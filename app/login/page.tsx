"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from "next/link";

import styles from "../styles/pages/login.module.scss"

import Toast from "../components/toast/toast";
import { Input } from "../components/input/input";

import { useUser } from "../context/user";

import wallet from "../images/wallet.png";
import walletRetina from "../images/wallet-retina.png";

interface Data {
  message: string,
  username: string,
  salary: string,
  token: string
}

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});
  const { setUsername, setSalary }  = useUser()
  const common = { alt: 'wallet', width: 216, height: 288, loading: "eager" };
  
  const handleToast = (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setShowToast(true)
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      const { username, salary, message }: Data = await response.json();

      if (!response.ok) {
        throw new Error(message);
      }

      localStorage.setItem("username", username)
      localStorage.setItem("salary", salary)
      setUsername(username);
      setSalary( salary)
      handleToast(true, message)
      router.replace("/");
      
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      handleToast(false, errorMessage)
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
          <p>Entre e visualize como foi seus gastos nos meses anteriores, como está no mês atual e como ficará nos próximos meses.</p>
        </div>
        
        <div className={styles.container_user__form}>
          <h1 className={styles.container_user__form_title}>Acessar sua conta</h1>
          <p className={styles.container_user__form_subtitle}>Insira sua conta</p>

          <form onSubmit={submit}>
            <Input
              label="Email"
              type="email" 
              placeholder=""
              required
              name="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />

            <Input
              label="Senha"
              type="password" 
              placeholder=""
              required
              name="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />

            <input type="submit" value="Acessar" className="button button__primary"/>
          </form>

          <p className={styles.container_user__form_new}>Não possui conta? <Link href="/register">Crie uma</Link></p>
        </div>
      </div>
    </div>
  );
}
