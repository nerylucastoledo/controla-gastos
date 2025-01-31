"use client"

import React, { SetStateAction } from 'react'

import { Modal } from '@/app/components/modal/modal'

import { fetcherPost } from '@/app/utils';
import { ICard, IPeople } from '@/app/utils/types';

interface IProps {
  item: IPeople | ICard | null
  mutate: () => void;
  onCustomDismiss: (value: SetStateAction<boolean>) => void;
}

export const ModalConfigDelete = ({ item, onCustomDismiss, mutate }: IProps) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let url = `peoples/${item?._id}`;

      if (item && "color" in item) {
        url = `cards/${item?._id}`;
      }

      await fetcherPost<IPeople | ICard, { message: string }>(
        `http://localhost:4000/api/${url}`, 
        "DELETE", 
      );
      mutate()
      onCustomDismiss(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Modal
        background='#1E1E1E'
        customClass={`modal-form-active modal-form`}
        onCustomDismiss={() => onCustomDismiss(false)}
      >
        <h2 className='title'>Deletar</h2>
        
        <p className='subtitle' data-testid="text-remove">Os gastos não serão deletados, você só não poderá mais cadastrar nada para esse cartão ou pessoa. Quer deletar mesmo <b>{item?.name}</b>?</p>
        <button onClick={handleSubmit} id='delete' className={`button button__primary button`} data-testid="submit-delete">
          Deletar
        </button>
      </Modal>
    </>
  )
}
