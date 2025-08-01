import React from 'react'

import styles from "../../../styles/components/credit-card/credit-card.module.scss"

import { CiCreditCard1 } from "react-icons/ci";

import {  formatToCurrencyBRL } from '@/utils';

type InvoiceCard = {
  name: string;
  color: string;
  total: number;
}

export default function Card({ name, color, total }: InvoiceCard) {
  return (
    <div 
      className={styles.item} 
      style={{ backgroundColor: color }}
    >
      <div className={styles.icon}>
        <CiCreditCard1 size={20} color='var(--gray)'/>
        <h2>{name}</h2>
      </div>

      <p className={styles.cardNumber}>**** **** **** ****</p>

      <div className={styles.total}>
        <p>Fatura atual</p>
        <p>{formatToCurrencyBRL(total)}</p>
      </div>
    </div>
  )
}
