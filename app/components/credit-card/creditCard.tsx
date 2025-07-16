import React from 'react'

import styles from "../../styles/components/credit-card/credit-card.module.scss"

export default function CreditCard() {
  return (
    <div className={styles.card}>
      <h1 className='title'>Cartões</h1>

      <div className={styles.container}>
        <div className={styles.item}>
          <h2>Nubank</h2>
          <p>R$ 1.200,00</p>
          <p>**** **** **** ****</p>
        </div>
        <div className={styles.item}>
          <h2>Samsung</h2>
          <p>R$ 1.200,00</p>
          <p>**** **** **** ****</p>
        </div>
        <div className={styles.item}>
          <h2>Samsung</h2>
          <p>R$ 1.200,00</p>
          <p>**** **** **** ****</p>
        </div>
        <div className={styles.item}>
          <h2>Cartão de Crédito</h2>
          <p>R$ 1.200,00</p>
          <p>**** **** **** ****</p>
        </div>
        <div className={styles.item}>
          <h2>Cartão de Crédito</h2>
          <p>R$ 1.200,00</p>
          <p>**** **** **** ****</p>
        </div>
        <div className={styles.item}>
          <h2>Cartão de Crédito</h2>
          <p>R$ 1.200,00</p>
          <p>**** **** **** ****</p>
        </div>
        <div className={styles.item}>
          <h2>Cartão de Crédito</h2>
          <p>R$ 1.200,00</p>
          <p>**** **** **** ****</p>
        </div>
      </div>
    </div>
  )
}
