"use client";

import login from '@/actions/login'
import { useActionState, } from 'react';
import Link from 'next/link';

import { Input } from '@/app/components/forms/input';
import { Submit } from '@/app/components/forms/submit';

import styles from "@/app/styles/components/forms/form.module.scss";
import ErrorMessage from '@/app/components/error-message/error-message';

export default function LoginForm() {
  const [state, action] = useActionState(login, { ok: false, error: '', data: null })

  return (
    <>
      <form action={action} className={styles.form}>
        <Input
          label='Email'
          id='email'
          placeholder='Digite o seu email'
          name='email'
          type='email'
          autoComplete='email'
          required
        />

        <Input
          label='Password'
          id='password'
          placeholder='Digite a sua senha'
          name='password'
          type='password'
          autoComplete='current-password'
          required
        />

        <ErrorMessage error={state.error} />


        <Submit>Entrar</Submit>
      </form>

      <Link href={"/forgot-password"}>Perdeu a senha?</Link>
    </>
  )
}