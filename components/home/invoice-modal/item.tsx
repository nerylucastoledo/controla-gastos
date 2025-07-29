import React from 'react'

import styles from "../../../styles/components/modal/invoice-modal.module.scss"
import { Bill, BillDTOInputByDateAndCard } from '@/dto/billDTO';

type ItemProps = {
  data: BillDTOInputByDateAndCard[];
  setShowModalAction: React.Dispatch<React.SetStateAction<ModalActionType>>;
}

type Invoice = Bill & {
  _id: string;
}

type ModalActionType = {
  show: boolean;
  type: "edit" | "delete" | null;
  item: Invoice | null;
}

export default function Item({ data, setShowModalAction }: ItemProps) {
  if (!data || data.length === 0) return null;

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
