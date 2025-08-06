"use client"

import React, { useState } from 'react'
import toast from 'react-hot-toast';

import styles from "../../../styles/components/modal/modal-action.module.scss"

import ModalAction from '@/components/modal-action/modalAction';
import { CardDTOOutput } from '@/dto/cardDTO';
import { PeopleDTOOutput } from '@/dto/peopleDTO';
import { deletePeopleOrCard } from '@/actions/account';

type ModalDeleteProps = {
  handleCloseModal: () => void;
  item: CardDTOOutput | PeopleDTOOutput;
}

export default function ModalDelete({ handleCloseModal, item }: ModalDeleteProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true)
    const endpoint = 'color' in item ? 'cards' : 'peoples';
    const state = await deletePeopleOrCard(`/${endpoint}/${item._id}`);

    setLoading(false);

    const error = !state.ok && state.data !== null;

    if (error) {
      toast.error("Erro ao deletar. Tente novamente!");
      return;
    }

    if (state.ok) {
      toast.success("A remoção foi feita com sucesso!");
      handleCloseModal();
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
        <button data-testid="delete-button" className={styles.delete} onClick={handleDelete} disabled={loading}>
          {loading ? "Apagando..." : "Apagar"}
        </button>
      </div>
    </ModalAction>
  )
}
