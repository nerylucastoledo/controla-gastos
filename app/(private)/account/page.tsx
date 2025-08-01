import { Metadata } from 'next'
import React, { Suspense } from 'react'

import styles from "../../../styles/components/account/account.module.scss"

import transaction from '@/actions/transactions';
import Account from '@/components/account/account';
import SkeletonAccountPage from './loading';

export const metadata: Metadata = {
  title: "Controla gastos | Suas informações",
  description: "Confira suas informações no Controla Gastos para entender melhor como seu dinheiro está sendo utilizado. Com esses dados, você pode tomar decisões mais conscientes e melhorar seu controle financeiro."
}

export default async function Page() {
  const peoples = await transaction('peoples');
  const cards = await transaction('cards');

  return (
    <section className={styles.newCardPeople}>
      <Suspense fallback={<SkeletonAccountPage />}>
        <h1 className='title'>Informações</h1>
        
        <Account cards={cards} peoples={peoples} />
      </Suspense>
    </section>
  )
}
