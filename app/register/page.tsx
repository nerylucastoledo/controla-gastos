"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from "next/link";

import styles from "../styles/login.module.scss"

import wallet from "../images/wallet.png";
import walletRetina from "../images/wallet-retina.png";
import Toast from "../components/toast/toast";

interface User {
  name: string,
  username: string,
  email: string,
}

interface Data {
  message: string,
  user: User
}

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
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
      
      const response = await fetch("http://localhost:4000/api/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, salary, password, username })
      });

      const { message }: Data = await response.json();
      
      if (!response.ok) {
        throw new Error(message);
      }

      handleToast(true, message)
      router.replace("/login");
      
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
          <p>Ao se cadastrar você vai conseguir ter maior controle dos seus gastos, visualizar onde você mais está gastando e quanto cada pessoa deve te passar no final do mês, caso você empreste seu cartão.</p>
        </div>
        
        <div className={`${styles.form_register} ${styles.container_user__form}`}>
          <h1 className={styles.container_user__form_title}>Criar uma conta</h1>
          <p className={styles.container_user__form_subtitle}>Coloque seus dados</p>

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
                type="text" 
                name="name" 
                id="name"
                placeholder=""
                required
                value={name}
                onChange={({ target }) => setName(target.value)}
              />

              <label htmlFor="name" data-testid="name-label">Nome</label>
            </div>

            <div>
              <input 
                type="text" 
                name="salary" 
                id="salary"
                placeholder=""
                required
                value={salary}
                onChange={({ target }) => setSalary(target.value)}
              />

              <label htmlFor="salary" data-testid="salary-label">Salário</label>
            </div>
            <div>
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder=""
                required
                value={password}
                role="password"
                onChange={({ target }) => setPassword(target.value)}
              />
              <label htmlFor="password" data-testid="password-label">Senha</label>
            </div>

            <input type="submit" value="Cadastrar" className="button button__primary"/>
          </form>

          <p className={styles.container_user__form_new}>Já possui conta? <Link href="/login">Acesse</Link></p>
        </div>
      </div>
    </div>
  );
}
