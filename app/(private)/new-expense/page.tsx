import { Metadata } from 'next'
import React from 'react'

import styles from "../../../styles/components/new-expense/new-expense.module.scss"

import NewExpenseForm from '@/components/new-expense-form/newExpenseForm';

import transaction from '@/actions/transactions';

export const metadata: Metadata = {
  title: "Controla gastos | Adicionar gasto",
  description: "Registre seus gastos no Controla Gastos e obtenha insights valiosos sobre como você está utilizando seu dinheiro. Com essas informações, você pode tomar decisões mais conscientes e melhorar o controle financeiro."
}

export default async function Page() {
  const peoples = await transaction('peoples');
  const cards = await transaction('cards');

  return (
    <section className={styles.newExpense}>
      <h1 className='title'>Adicionar gasto</h1>

      <NewExpenseForm peoples={peoples} cards={cards} />
    </section>
  )
}
