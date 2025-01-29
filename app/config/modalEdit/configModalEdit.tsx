"use client"

import { Input } from '@/app/components/input/input'
import Modal from '@/app/components/modal/modal'
import Toast from '@/app/components/toast/toast';
import { fetcherPost } from '@/app/utils';
import { ICard, IPeople } from '@/app/utils/types';
import React, { SetStateAction, useState } from 'react'

interface IUpdate {
  _id: string;
  name: string;
  color?: string;
}

interface IProps {
  onCustomDismiss: (value: SetStateAction<boolean>) => void;
  item: IPeople | ICard | null
}

export const ConfigModalEdit = ({ onCustomDismiss, item }: IProps) => {
  const [itemUpdated, setItemUpdated] = useState(item);
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});
  const [showToast, setShowToast] = useState(false);

  const handleToast = (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemUpdated) return; 

    try {
      let url = "peoples";
      let body: IUpdate;

      if ("color" in itemUpdated) {
        url = "cards";
        body = {
          _id: itemUpdated._id,
          name: itemUpdated.name,
          color: itemUpdated.color,
        };
      } else {
        body = {
          _id: itemUpdated._id,
          name: itemUpdated.name,
        };
      }

      const response = await fetcherPost<IUpdate, { message: string }>(
        `http://localhost:4000/api/${url}`, 
        "PUT", 
        body
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
        <Toast success={toastCustom.error} message={toastCustom.message} />
      )}
      <Modal
        background='#1E1E1E'
        customClass={`modal-form-active modal-form`}
        onCustomDismiss={() => onCustomDismiss(false)}
      >
        <h2 className='title'>Atualizar</h2>

        <form onSubmit={handleSubmit}>
          <Input
            label="Item"
            type="text" 
            name="item"
            data-testid="item"
            required
            value={itemUpdated?.name}
            onChange={({ target }) => setItemUpdated(prev => prev ? { ...prev, name: target.value } : null)}
          />

          {itemUpdated && "color" in itemUpdated && (
            <Input
              label="Cor"
              type="color" 
              name="item"
              data-testid="cor"
              required
              value={itemUpdated?.color}
              onChange={({ target }) => setItemUpdated(prev => prev ? { ...prev, color: target.value } : null)}
            />
          )}

          <input type="submit" value="Atualizar" className="button button__primary" data-testid="submit-edit" />
        </form>
      </Modal>
    </>
  )
}
