import { Metadata } from 'next'
import React from 'react'

import styles from "../../../styles/components/new-card-people/new-card-people.module.scss"
import NewOptionForm from '@/components/new-card-people-form/newCardPeopleForm'

export const metadata: Metadata = {
  title: "Controla gastos | Adicionar cartão ou pessoa",
  description: "Adicione um cartão ou pessoa no Controla gastos para conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele."
}

export default async function Page() {
  return (
    <section className={styles.newCardPeople}>
      <h1 className='title'>Adicionar cartão ou pessoa</h1>

      <NewOptionForm />
    </section>
  )
}
