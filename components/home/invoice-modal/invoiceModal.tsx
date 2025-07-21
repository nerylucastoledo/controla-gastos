"use client"

import React, { MouseEvent, useState } from 'react'

import styles from "../../../styles/components/invoice-modal/invoice-modal.module.scss"

import { BillByCard } from '@/dto/billDTO'

import People from './people';
import Item from './item';
import { formatToCurrencyBRL } from '@/utils';
import { useRouter } from 'next/navigation';

type InvoiceModalProps = {
  data: BillByCard[];
  card: string;
}

export default function InvoiceModal({ data, card }: InvoiceModalProps) {
  const router = useRouter();
  const [nameActive, setNameActive] = useState<string | null>("Eu");

  const names = data.map(item => item.name);
  const cardName = card.replaceAll("%20", " ");
  const filteredData = data.filter(item => item.name === nameActive);

  const handleCloseModal = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    router.back();
  }

  return (
    <div className={`invoice ${styles.invoice}`} onClick={handleCloseModal}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{cardName}</h2>
          <p>{formatToCurrencyBRL(filteredData[0]?.totalInvoice ?? 0)}</p>
        </div>

        <div className={styles.content}>
          <People 
            names={names}
            nameActive={nameActive}
            setNameActive={setNameActive}
          />

          <Item data={filteredData} />
        </div>
      </div>
    </div>
  )
}
