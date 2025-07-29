"use client"

import React from 'react'
import { mutate } from 'swr';
import toast from 'react-hot-toast';

import styles from "../../../styles/components/modal/modal-action.module.scss"

import ModalAction from '@/components/modal-action/modalAction';

import { Bill } from '@/dto/billDTO';
import { useDate } from '@/context/date-context';
import { billDelete } from '@/actions/bill';

type Invoice = Bill & {
  _id: string;
}

type ModalDeleteProps = {
  handleCloseModal: () => void;
  invoice: Invoice;
}

export default function ModalDeleteInvoice({ handleCloseModal, invoice }: ModalDeleteProps) {
  const { date } = useDate();

  const handleDelete = async () => {
    const state = await billDelete(`/expenses/${invoice._id}`);
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
    <ModalAction
      handleCloseModal={handleCloseModal}
      title='Deletar item'
      subtitle={`Tem certeza que deseja apagar ${invoice.item}?`}
    >
      <div className={styles.actions}>
        <button onClick={handleCloseModal}>Cancelar</button>
        <button className={styles.delete} onClick={handleDelete}>Apagar</button>
      </div>
    </ModalAction>
  )
}
