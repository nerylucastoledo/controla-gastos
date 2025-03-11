"use client"

import React, { useCallback, useEffect, useReducer, useState } from 'react'
import useSWR, { useSWRConfig } from "swr";

import styles from "../../styles/components/invoice.module.scss";

import { Input } from '../input/input';
import { InvoicePeople } from './invoice-people/invoice-people';
import { InvoiceItem } from './invoice-item/invoice-item';
import { LoadingIcon } from '../loading/loadingIcon';
import { Select } from '../select/select';
import { Toast } from '../toast/toast';

import { categorys, fetcher, fetcherPost, formatCurrency, formatToCurrencyBRL } from '@/app/utils';
import { Modal } from '../modal/modal';
import { useDate } from '@/app/context/date';

interface IProps {
  card: string;
  backgroundColor: string;
  date: string;
  onDismiss?: () => void;
  username: string;
}

interface IInvoiceItemType {
  _id: string
  category: string,
  item: string,
  value: string,
}

interface IInvoice {
  name: string,
  invoices: IInvoiceItemType[],
  totalInvoice: number
}

interface IData {
  data: IInvoice[]
}

type InvoiceAction =
  | { type: 'SET_ITEM'; payload: string }
  | { type: 'SET_VALUE'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_ALL'; payload: IInvoiceItemType }
  | { type: 'RESET' };


const reducer = (state: IInvoiceItemType, action: InvoiceAction): IInvoiceItemType => {
  switch (action.type) {
    case 'SET_ITEM':
      return { ...state, item: action.payload };
    case 'SET_VALUE':
      return { ...state, value: action.payload };
    case 'SET_CATEGORY':
      return { ...state, category: action.payload };
    case 'SET_ALL':
      return { ...action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};
const initialState: IInvoiceItemType = { _id: "", category: "", item: "", value: "" };

export const InvoiceModal = ({  card, backgroundColor, date, onDismiss, username }: IProps) => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});
  const { currentDate } = useDate()

  const [itemUpdate, dispatch] = useReducer(reducer, initialState);
  const { mutate: mutateData } = useSWRConfig()

  const { data, error, isLoading, mutate } = useSWR<IData>(
    `${process.env.NEXT_PUBLIC_API_URL}/expenses/${username}/${date}/${card}`,
    fetcher
  )

  useEffect(() => {
    if (!data) return;
    if (name.length) return;

    setName(data.data.length ? data.data[0].name : "Eu");
  }, [data, name]);

  const handleMutate = async () => {
    mutate();
    mutateData(`${process.env.NEXT_PUBLIC_API_URL}/expenses/${username}/${currentDate}`)
  }
    
  const handleToast = useCallback(async (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setTimeout(() => setToastCustom({ error, message: "" }), 2000);
  }, [])

  const openModal = useCallback((invoice: IInvoiceItemType, modal: "edit" | "delete") => {
    dispatch({ type: 'SET_ALL', payload: invoice });

    if (modal === "delete") {
      setIsModalDeleteOpen(true)
      return;
    }

    setIsModalEditOpen(true)
  }, []);

  const closeModal = useCallback(() => {
    setIsModalEditOpen(false);
    setIsModalDeleteOpen(false)
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/expenses`

    if (isModalEditOpen) {
      try {
        const response = await fetcherPost<IInvoiceItemType, { message: string }>(
          URL, 
          "PUT", 
          itemUpdate
        );
        handleToast(true, response.message)
        closeModal();
        handleMutate();
      } catch (err) {
        handleToast(false, (err as Error).message);
      }
    } else {
      try {
        const response = await fetcherPost<IInvoiceItemType, { message: string }>(
          `${URL}/${itemUpdate._id}`, 
          "DELETE", 
        );
        handleToast(true, response.message)
        closeModal();

        if (data?.data[0].invoices.length === 1 && onDismiss) {
          onDismiss()
        }
        
        handleMutate();
      } catch (err) {
        handleToast(false, (err as Error).message);
      }
    }
  }

  if (error) return null;

  const invoiceByName = data?.data.filter((item) => item.name === name)
  const cardName = card.replace("%20", " ")

  return (
    <>
      <Toast message={toastCustom.message} success={toastCustom.error} />

      <Modal background={backgroundColor} onCustomDismiss={onDismiss}>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            {data?.data.length && invoiceByName?.length && (
              <div className={styles.invoice}>
                <div className={styles.title}>
                  {cardName}
                </div>
                
                <div className={styles.container}>
                  <div className={styles.people}>
                    {data.data.map((people) => (
                      <InvoicePeople 
                        key={people.name}
                        name={people.name} 
                        nameActive={name} 
                        setName={setName} 
                      />
                    ))}
                  </div>

                  <div className={styles.item}>
                    <InvoiceItem
                      data={invoiceByName[0].invoices} 
                      openModal={openModal}
                    />
                  </div>
                </div>
                
                <p className={styles.total}>
                  Total: {formatToCurrencyBRL(invoiceByName[0].totalInvoice)}
                </p>
              </div>
            )}
          </>
        )}
      </Modal>

      {isModalEditOpen && (
        <Modal
          background='#1E1E1E'
          customClass={`modal-form-active modal-form`}
          onCustomDismiss={closeModal}
        >
          <h2 className='title'>Atualizar o gasto</h2>

          <form onSubmit={handleSubmit}>
            <Input
              data-testid="item"
              label="Item"
              name="item"
              onChange={({ target }) => dispatch({ type: 'SET_ITEM', payload: target.value })}
              required
              type="text" 
              value={itemUpdate.item}
            />

            <Input
              data-testid="value"
              label="Valor (R$)"
              name="value"
              onChange={({ currentTarget }) => dispatch({ type: 'SET_VALUE', payload: formatCurrency(currentTarget.value) })}
              required
              type="text" 
              value={itemUpdate.value}
            />

            <Select 
              id='category' 
              label='Categoria' 
              className={"modal-form__select"}
              defaultValue={itemUpdate.category}
              onChange={({ currentTarget }) => dispatch({ type: 'SET_CATEGORY', payload: currentTarget.value })}
            >
              {categorys.map((category) => <option key={category} value={category}>{category}</option>)}
            </Select>

            <input type="submit" value="Atualizar" className="button button__primary" data-testid="submit-edit" />
          </form>
        </Modal>
      )}

      {isModalDeleteOpen && (
        <Modal
          background='#1E1E1E'
          customClass={`modal-form-active modal-form`}
          onCustomDismiss={closeModal}
        >
          <h2 className='title'>Deletar o gasto</h2>
          
          <p className='subtitle' data-testid="text-remove">Após deletar não será possível recuperar <br></br> tem certeza que quer deletar a(o) <b>{itemUpdate.item}</b>?</p>
          <button onClick={handleSubmit} id='delete' className={`button button__primary button`} data-testid="submit-delete">
            Deletar
          </button>
        </Modal>
      )}
    </>
  )
}