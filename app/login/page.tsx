"use client";

import { useState } from "react";
import Image from 'next/image'
import Link from "next/link";
import { useRouter } from 'next/navigation';

import styles from "../styles/login.module.scss"

import wallet from "../images/wallet.png";
import walletRetina from "../images/wallet-retina.png";
import Toast from "../components/toast/Toast";
import { useUser } from "../context/user";

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
    setTimeout(() => setShowToast(false), 3000);
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const { username, salary, message }: Data = await response.json();
      if (!response.ok) {
        throw new Error(message);
      }

      handleToast(true, message)
      localStorage.setItem("username", username)
      setUsername(username);
      localStorage.setItem("salary", salary)
      setSalary( salary)
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
            <div>
              <input 
                type="email" 
                name="email" 
                id="email"
                placeholder=""
                required
                value={email}
                onChange={({ target }) => setEmail(target.value)}
              />

              <label htmlFor="email" data-testid="email-label">Email</label>
            </div>
            <div>
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder=""
                role="password"
                required
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
              <label htmlFor="password" data-testid="password-label">Senha</label>
            </div>

            <input type="submit" value="Acessar" className="button button__primary"/>
          </form>

          <p className={styles.container_user__form_new}>Não possui conta? <Link href="/register">Crie uma</Link></p>
        </div>
      </div>
    </div>
  );
}
