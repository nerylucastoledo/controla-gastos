import { Metadata } from 'next'
import React, { Suspense } from 'react'

import styles from "../../../styles/components/account/account.module.scss"
import transaction from '@/actions/transactions';
import Account from '@/components/account/account';

export const metadata: Metadata = {
  title: "Controla gastos | Adicionar cartão ou pessoa",
  description: "Verifique suas informações no Controla gastos para conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele."
}

export default async function Page() {
  const peoples = await transaction('peoples');
  const cards = await transaction('cards');

  return (
    <section className={styles.newCardPeople}>
      <h1 className='title'>Informações</h1>
      
      <Suspense fallback={<div className='loading'>Carregando...</div>}>
        <Account cards={cards} peoples={peoples} />
      </Suspense>
    </section>
  )
}
