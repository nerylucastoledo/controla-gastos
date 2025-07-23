"use client"

import React, { ChangeEvent, useActionState, useEffect } from 'react'
import { mutate } from 'swr'
import { IoIosCloseCircle } from "react-icons/io";

import styles from "../../../styles/components/modal/modal-action.module.scss"

import { Input } from '@/components/forms/input';
import { Select } from '@/components/forms/select';

import editInvoice from '@/actions/edit-invoice';
import { useDate } from '@/context/date-context';
import { categorys, formatCurrency } from '@/utils';
import { Invoice } from '@/dto/billDTO';

type ModalEditProps = {
  handleCloseModal: () => void;
  modalAction: Invoice | null;
}

export default function ModalEdit({ handleCloseModal, modalAction }: ModalEditProps) {
  const { date } = useDate();

  const [state, actionForm] = useActionState(editInvoice, { ok: false, error: '', data: null });

  useEffect(() => {
    if (!state.ok) return;

    handleCloseModal();
    mutate(`${date.month}${date.year}`);
  }, [date, state, handleCloseModal]);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    e.target.value = formatCurrency(value);
  };

  if (!modalAction) return null;

  return (
    <div className={`modal ${styles.modalAction}`}>
      <div className={`container ${styles.container}`}>
        <button className={styles.closeButton} onClick={handleCloseModal}>
          <IoIosCloseCircle size={30} />
        </button>

        <div className={styles.header}>
          <h2>Editar um item</h2>
          <p>Faça as alterações no item selecionado.</p>
        </div>

        <form action={actionForm}>
          <input type="hidden" name="id" value={modalAction._id} />

          <Input
            label='Item'
            id='item'
            placeholder='Digite o item'
            name='item'
            type='text'
            defaultValue={modalAction.item}
            autoComplete='off'
            required
          />

          <Input
            label='Valor'
            id='value'
            placeholder='Digite o valor'
            name='value'
            type='text'
            defaultValue={formatCurrency(modalAction.value)}
            onChange={handleValueChange}
            autoComplete='off'
            required
          />

          <Select
            id='category'
            name='category'
            label='Categoria'
            options={Array.from(categorys)}
            defaultValue={modalAction.category}
            className={styles.select}
            handleChange={(value) => value}
          />

          <div className={styles.actions}>
            <button type='button' onClick={handleCloseModal}>Cancelar</button>
            <button type='submit' className={styles.edit}>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
