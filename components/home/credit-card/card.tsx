import React from 'react'

import styles from "../../../styles/components/credit-card/credit-card.module.scss"

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
      <h2>{name}</h2>
      <p>{formatToCurrencyBRL(total)}</p>
      <p>**** **** **** ****</p>
    </div>
  )
}
