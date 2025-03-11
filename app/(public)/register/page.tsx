"use client";

import { useCallback, useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Link from "next/link";

import styles from "../../styles/pages/login.module.scss"

import { Input } from "../../components/input/input";
import { Toast } from "../../components/toast/toast";

import { fetcherPost, formatCurrency, parseCurrencyString } from "../../utils";

import wallet from "../../images/wallet.webp";
import walletRetina from "../../images/wallet-retina.webp";

interface IData {
  email: string;
  name: string;
  password: string;
  salary: number;
  username: string;
}

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("R$ 0,00");
  const [password, setPassword] = useState("");
  const [toastCustom, setToastCustom] = useState({ error: true, message: "" });
  
  const router = useRouter();

  const handleToast = useCallback(async (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setTimeout(() => setToastCustom({ error, message: "" }), 2000);
  }, [])

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const newiD = Math.random().toString(16).slice(2)
      const username = name.split(" ")[0] + newiD;
      const body = { 
        email, 
        name, 
        password, 
        salary: parseCurrencyString(salary), 
        username 
      }

      const response = await fetcherPost<IData, { message: string }>(`${process.env.NEXT_PUBLIC_API_URL}/register`,
        "POST", 
        body
      );
      
      await handleToast(true, response.message)
      router.replace("/login");
      
    } catch (err) {
      const message = (err as Error).message
      handleToast(false, message)
    }
  }

  return (
    <div className={styles.background}>
      <Toast message={toastCustom.message} success={toastCustom.error} />

      <div className={styles.container_user}>
        <div className={styles.container_user__info}>
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet={walletRetina.src} />
            <Image
              width={216} 
              height={288}
              src={wallet.src} 
              alt="Imagem de uma carteira"
              priority={true} 
            />
          </picture>
          <p>
            Ao se cadastrar você vai conseguir ter maior controle dos seus gastos, visualizar onde você mais está gastando e quanto cada pessoa deve te passar no final do mês, caso você empreste seu cartão.
          </p>
        </div>
        
        <div className={`${styles.form_register} ${styles.container_user__form}`}>
          <h1 className={styles.container_user__form_title}>Criar uma conta</h1>
          <p className={styles.container_user__form_subtitle}>Coloque seus dados</p>

          <form onSubmit={submit}>
            <Input
              data-testid="email"
              label="Email"
              name="email"
              placeholder=""
              onChange={({ target }) => setEmail(target.value)}
              required
              type="email" 
              value={email}
            />

            <Input
              data-testid="name"
              label="Nome"
              name="name"
              placeholder=""
              onChange={({ target }) => setName(target.value)}
              required
              type="text" 
              value={name}
            />

            <Input
              data-testid="salary"
              label="Salário"
              name="salary"
              placeholder=""
              onChange={({ target }) => setSalary(formatCurrency(target.value))}
              required
              type="text" 
              value={salary}
            />

            <Input
              data-testid="password"
              label="Senha"
              name="password"
              placeholder=""
              onChange={({ target }) => setPassword(target.value)}
              required
              type="password" 
              value={password}
            />

            <input 
              type="submit" 
              value="Cadastrar" 
              className="button button__primary"
              data-testid="submit" 
            />
          </form>

          <p className={styles.container_user__form_new}>
            Já possui conta? <Link href="/login">Acesse</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
