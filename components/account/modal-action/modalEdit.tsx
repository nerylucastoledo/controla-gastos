"use client"

import React, { useActionState, useEffect, useState } from 'react'
import { mutate } from 'swr'
import toast from 'react-hot-toast';

import styles from "../../../styles/components/modal/modal-action.module.scss"

import Input from '@/components/forms/input';

import { useDate } from '@/context/date-context';
import ModalAction from '@/components/modal-action/modalAction';
import { CardDTOOutput } from '@/dto/cardDTO';
import { PeopleDTOOutput } from '@/dto/peopleDTO';
import { billEdit } from '@/actions/bill';

type ModalEditProps = {
  handleCloseModal: () => void;
  item: CardDTOOutput | PeopleDTOOutput | null;
}

export default function ModalEdit({ handleCloseModal, item }: ModalEditProps) {
  const { date } = useDate();

  const [color, setColor] = useState(null);

  const [state, actionForm] = useActionState(billEdit, { ok: false, error: '', data: null });

  useEffect(() => {
    const error = !state.ok && state.data !== null;

    if (error) {
      toast.error("Erro ao editar a despesa. Tente novamente!");
      return;
    };

    if (state.ok) {
      toast.success("Despesa atualizada com sucesso!");
      handleCloseModal();
      mutate(`expenses/${date.month}${date.year}`);
    }

  }, [date, state, handleCloseModal]);

  if (!item) return null;

  return (
    <ModalAction
      handleCloseModal={handleCloseModal}
      title='Editar'
      subtitle='Faça as alterações necessárias'
    >
      <form action={actionForm}>
        <input type="hidden" name="id" value={item._id} />

        <Input
          label='Nome'
          id='name'
          placeholder='Digite o nome'
          name='name'
          type='text'
          defaultValue={item.name}
          autoComplete='off'
          required
        />

        {false && (
          <Input
            id="color"
            name='color'
            label="Cor do cartão"
            value={item.color}
            onChange={(e) => setColor(e.target.value)}
            style={{ backgroundColor: color }}
            type="color"
            placeholder="Selecione a cor do cartão"
          />
        )}

        <div className={styles.actions}>
          <button type='button' onClick={handleCloseModal}>Cancelar</button>
          <button type='submit' className={styles.edit}>Salvar</button>
        </div>
      </form>
    </ModalAction>
  )
}
