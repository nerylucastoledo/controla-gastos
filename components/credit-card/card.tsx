import React from 'react'

import styles from "../../styles/components/credit-card/credit-card.module.scss"
import {  formatToCurrencyBRL } from '@/utils';

type CardProps = {
  name: string;
  color?: string;
  totalInvoice: number;
}

export default function Card({ name, color, totalInvoice }: CardProps) {
  return (
    <div 
      className={styles.item} 
      style={{ backgroundColor: color }}
    >
      <h2>{name}</h2>
      <p>{formatToCurrencyBRL(totalInvoice)}</p>
      <p>**** **** **** ****</p>
    </div>
  )
}
