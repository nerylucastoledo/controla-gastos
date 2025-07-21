"use client";

import { useActionState, useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

import { Input } from '@/components/forms/input';
import { Submit } from '@/components/forms/submit';
import ErrorMessage from '@/components/forms/error-message';

import register from '@/actions/register';
import { formatCurrency } from '@/utils';

import styles from "../../styles/components/forms/form.module.scss";

export default function CreateAccountForm() {
  const [salary, setSalary] = useState('R$ 0,00');
  const [state, action] = useActionState(register, { ok: false, error: '', data: null})

  useEffect(() => {
      if (state.ok) {
        localStorage.setItem("salary", state.data.salary.toString());
        redirect("/");
      }
    }, [state]);

  const handleSalary = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSalary(formatCurrency(value));
  }

  return (
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
        label='Nome'
        id='name'
        placeholder='Digite o seu nome'
        name='name'
        type='text'
        autoComplete='name'
        required
      />

      <Input
        label='Salário'
        id='salary'
        placeholder='Digite o seu salário'
        name='salary'
        value={salary}
        type='text'
        autoComplete='salary'
        required
        onChange={handleSalary}
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

      <Submit>Criar conta</Submit>
    </form>
  )
}