import React from 'react'

import styles from "../../../styles/components/modal/invoice-modal.module.scss"

import { BillByCard, Invoice } from '@/dto/billDTO'

type ModalActionType = {
  show: boolean;
  type: "edit" | "delete" | null;
  item: Invoice | null;
}

export default function Item({ data, setShowModalAction }: { data: BillByCard[], setShowModalAction: React.Dispatch<React.SetStateAction<ModalActionType>> }) {

  if (!data || data.length === 0) {
    return (
      <p className={`empty ${styles.empty}`}>Nada para mostrar</p>
    );
  }

  const { invoices } = data[0];

  const handleEdit = (item: Invoice) => {
    setShowModalAction({ show: true, type: "edit", item });
  };

  const handleDelete = (item: Invoice) => {
    setShowModalAction({ show: true, type: "delete", item });
  };

  return (
    <div className={styles.item}>
      {invoices.map((item, index) => (
        <div key={index} className={styles.details}>
          <div className={styles.info}>
            <p>{item.item}</p>
            <p className={styles.value}>{item.value}</p>
          </div>

          <div className={styles.actions}>
            <button onClick={() => handleEdit(item)}>Editar</button>
            <button onClick={() => handleDelete(item)}>Deletar</button>
          </div>
        </div>
      ))}
    </div>
  )
}
