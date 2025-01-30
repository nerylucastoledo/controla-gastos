"use client"

import React, { SetStateAction, useState } from 'react'

import Modal from '@/app/components/modal/modal'
import Toast from '@/app/components/toast/toast';

import { fetcherPost } from '@/app/utils';
import { ICard, IPeople } from '@/app/utils/types';

interface IProps {
  item: IPeople | ICard | null
  onCustomDismiss: (value: SetStateAction<boolean>) => void;
}

export const ConfigModalDelete = ({ onCustomDismiss, item }: IProps) => {
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});
  const [showToast, setShowToast] = useState(false);

  const handleToast = (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let url = `peoples/${item?._id}`;

      if (item && "color" in item) {
        url = `cards/${item?._id}`;
      }

      const response = await fetcherPost<IPeople | ICard, { message: string }>(
        `http://localhost:4000/api/${url}`, 
        "DELETE", 
      );
      handleToast(true, response.message)
      onCustomDismiss(false)
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
        <h2 className='title'>Deletar</h2>
        
        <p className='subtitle' data-testid="text-remove">Todos os gastos serão deletados juntos <br></br> tem certeza que quer deletar a(o) <b>{item?.name}</b>?</p>
        <button onClick={handleSubmit} id='delete' className={`button button__primary button`} data-testid="submit-delete">
          Deletar
        </button>
      </Modal>
    </>
  )
}
