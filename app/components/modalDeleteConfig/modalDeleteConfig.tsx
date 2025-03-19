"use client"

import React, { SetStateAction, useState } from 'react'

import { Modal } from '@/app/components/modal/modal'

import { fetcherPost } from '@/app/utils';
import { Toast } from '../toast/toast';
import { PeopleOutput } from '@/app/dto/peopleDTO';
import { CardOutput } from '@/app/dto/cardDTO';
import { ResponseErrorOutput, ResponseOutput } from '@/app/dto/fetch';

interface IProps {
  item: PeopleOutput | CardOutput | null
  mutate: () => void;
  onCustomDismiss: (value: SetStateAction<boolean>) => void;
}

export const ModalConfigDelete = ({ item, onCustomDismiss, mutate }: IProps) => {
  const [toast, setToast] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let url = `peoples/${item?._id}`;

      if (item && "color" in item) {
        url = `cards/${item?._id}`;
      }
      
      const response = await fetcherPost<PeopleOutput | CardOutput, ResponseOutput | ResponseErrorOutput>(
        `${process.env.NEXT_PUBLIC_API_URL}/${url}`, 
        "DELETE",
      );
      
      if ("error" in response) {
        throw new Error(response.message)
      }
      
      setToast({ success: true, message: response.message })
      mutate()
    } catch (err) {
      const message = err instanceof Error ? err.message : "Ocorreu um erro inesperado.";
      setToast({ success: false, message: message })
    } finally {
      onCustomDismiss(false)
    }
  }

  return (
    <>
      <Toast 
        success={toast?.success}
        message={toast?.message}
        show={toast ? true : false}
        setShowToast={setToast}
      />
      
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
