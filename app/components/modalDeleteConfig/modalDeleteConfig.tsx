"use client"

import React, { SetStateAction, useState } from 'react'

import { Modal } from '@/app/components/modal/modal'

import { fetcherPost } from '@/app/utils';
import { ICard, IPeople } from '@/app/utils/types';
import { Toast } from '../toast/toast';

interface IProps {
  item: IPeople | ICard | null
  mutate: () => void;
  onCustomDismiss: (value: SetStateAction<boolean>) => void;
}

export const ModalConfigDelete = ({ item, onCustomDismiss, mutate }: IProps) => {
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});
  const [showToast, setShowToast] = useState(false);

  const handleToast = (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setShowToast(true)
    onCustomDismiss(false)
    setTimeout(() => {
      setShowToast(false)
    }, 1000);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let url = `peoples/${item?._id}`;

      if (item && "color" in item) {
        url = `cards/${item?._id}`;
      }
      
      const response = await fetcherPost<IPeople | ICard, { message: string }>(
        `https://controla-gastos-back.onrender.com/api/${url}`, 
        "DELETE", 
      );
      mutate()
      handleToast(true, response.message)
    } catch (err) {
      handleToast(false, (err as Error).message);
    }
  }

  return (
    <>
      {showToast && (
        <Toast message={toastCustom.message} success={toastCustom.error} />
      )}
      <Modal
        background='#1E1E1E'
        customClass={`modal-form-active modal-form`}
        onCustomDismiss={() => onCustomDismiss(false)}
      >
        <h2 className='title' data-testid="title-delete">Deletar</h2>
        
        <p className='subtitle' data-testid="subtitle-delete">Os gastos não serão deletados, você só não poderá mais cadastrar nada para esse cartão ou pessoa. Quer deletar mesmo <b>{item?.name}</b>?</p>
        <button onClick={handleSubmit} id='delete' className={`button button__primary button`} data-testid="submit-delete">
          Deletar
        </button>
      </Modal>
    </>
  )
}
