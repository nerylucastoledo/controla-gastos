import React from 'react'

import styles from "../../../styles/components/invoice-modal/invoice-modal.module.scss"

import { BillByCard } from '@/dto/billDTO'


export default function Item({ data }: { data: BillByCard[]}) {

  if (!data || data.length === 0) {
    return (
      <p className={`empty ${styles.empty}`}>Nada para mostrar</p>
    );
  }

  const { invoices } = data[0];

  return (
    <div className={styles.item}>
      {invoices.map((item, index) => (
        <div key={index} className={styles.details}>
          <div className={styles.info}>
            <p>{item.item}</p>
            <p className={styles.value}>{item.value}</p>
          </div>

          <div className={styles.actions}>
            <button>Editar</button>
            <button>Deletar</button>
          </div>
        </div>
      ))}
    </div>
  )
}
