"use client"

import React, { ChangeEvent, useActionState, useEffect } from 'react'
import { mutate } from 'swr'
import toast from 'react-hot-toast';

import styles from "../../../styles/components/modal/modal-action.module.scss"

import Input from '@/components/forms/input';
import Select from '@/components/forms/select';
import ModalAction from '@/components/modal-action/modalAction';

import { useDate } from '@/context/date-context';
import { categorys, formatCurrency } from '@/utils';
import { Bill } from '@/dto/billDTO';
import { billEdit } from '@/actions/bill';

type Invoice = Bill & {
  _id: string;
}

type ModalEditProps = {
  handleCloseModal: () => void;
  invoice: Invoice;
}

export default function ModalEditInvoice({ handleCloseModal, invoice }: ModalEditProps) {
  const { date } = useDate();

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

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    e.target.value = formatCurrency(value);
  };

  return (
    <ModalAction
      handleCloseModal={handleCloseModal}
      title='Editar item'
      subtitle='Faça as alterações no item selecionado.'
    >
      <form action={actionForm}>
        <input type="hidden" name="id" value={invoice._id} />

        <Input
          label='Item'
          id='item'
          placeholder='Digite o item'
          name='item'
          type='text'
          defaultValue={invoice.item}
          autoComplete='off'
          required
        />

        <Input
          label='Valor'
          id='value'
          placeholder='Digite o valor'
          name='value'
          type='text'
          defaultValue={formatCurrency(invoice.value)}
          onChange={handleValueChange}
          autoComplete='off'
          required
        />

        <Select
          id='category'
          name='category'
          label='Categoria'
          options={Array.from(categorys)}
          defaultValue={invoice.category}
          className={styles.select}
          handleChange={(value) => value}
        />

        <div className={styles.actions}>
          <button type='button' onClick={handleCloseModal}>Cancelar</button>
          <button type='submit' className={styles.edit}>Salvar</button>
        </div>
      </form>
    </ModalAction>
  )
}
