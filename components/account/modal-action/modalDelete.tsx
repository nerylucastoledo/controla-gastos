"use client"

import React from 'react'
import { mutate } from 'swr';
import toast from 'react-hot-toast';

import styles from "../../../styles/components/modal/modal-action.module.scss"

import { useDate } from '@/context/date-context';
import ModalAction from '@/components/modal-action/modalAction';
import { CardDTOOutput } from '@/dto/cardDTO';
import { PeopleDTOOutput } from '@/dto/peopleDTO';
import { billDelete } from '@/actions/bill';

type ModalDeleteProps = {
  handleCloseModal: () => void;
  item: CardDTOOutput | PeopleDTOOutput | null;
}

export default function ModalDelete({ handleCloseModal, item }: ModalDeleteProps) {
  const { date } = useDate();

  if (!item) return null;

  const handleDelete = async () => {
    const state = await billDelete(`/expenses/${item._id}`);
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
      subtitle={`Tem certeza que deseja apagar ${item.name}?`}
    >
      <div className={styles.actions}>
        <button onClick={handleCloseModal}>Cancelar</button>
        <button className={styles.delete} onClick={handleDelete}>Apagar</button>
      </div>
    </ModalAction>
  )
}
