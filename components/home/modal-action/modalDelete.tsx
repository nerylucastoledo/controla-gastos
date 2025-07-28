"use client"

import React from 'react'

import styles from "../../../styles/components/modal/modal-action.module.scss"
import { Invoice } from '@/dto/billDTO';

import { IoIosCloseCircle } from "react-icons/io";
import { useDate } from '@/context/date-context';
import { mutate } from 'swr';
import toast from 'react-hot-toast';
import { deleteInvoice } from '@/actions/invoice';

type ModalDeleteProps = {
  handleCloseModal: () => void;
  modalAction: Invoice | null;
}

export default function ModalDelete({ handleCloseModal, modalAction }: ModalDeleteProps) {
  const { date } = useDate();

  if (!modalAction) return null;

  const handleDelete = async () => {
    const state = await deleteInvoice(`/expenses/${modalAction._id}`);
    const error = !state.ok && state.data !== null;

    if (error) {
      toast.error("Erro ao deletar despesa. Tente novamente!");
      return;
    }

    if (state.ok) {
      toast.success("Despesa deletada com sucesso!");
      handleCloseModal();
      mutate(`expenses/${date.month}${date.year}`);
    }
  }

  return (
    <div className={`modal ${styles.modalAction}`}>
      <div className={`container ${styles.container}`}>
        <button className={styles.closeButton} onClick={handleCloseModal}>
          <IoIosCloseCircle size={30} />
        </button>

        <div className={`${styles.header} ${styles.headerDelete}`}>
          <h2>deletar um item</h2>

          <p>Tem certeza que deseja apagar <strong>{modalAction.item}</strong>?</p>
        </div>

        <div className={styles.actions}>
          <button onClick={handleCloseModal}>Cancelar</button>
          <button className={styles.delete} onClick={handleDelete}>Apagar</button>
        </div>
      </div>
    </div>
  )
}
