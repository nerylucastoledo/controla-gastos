"use client"

import React, { useEffect, useState } from 'react'
import useSWR from "swr";

import styles from "../../styles/components/invoice.module.scss";

import { Input } from '../input/input';
import { InvoicePeople } from './invoice-people/invoice-people';
import { InvoiceItem } from './invoice-item/invoice-item';
import { LoadingIcon } from '../loading/loadingIcon';
import { Select } from '../select/select';
import { Toast } from '../toast/toast';

import { categorys, fetcher, fetcherPost, formatCurrency, formatToCurrencyBRL } from '@/app/utils';
import { Modal } from '../modal/modal';

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

export const InvoiceModal = ({  card, backgroundColor, date, onDismiss, username }: IProps) => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [itemUpdate, setItemUpdate] = useState<IInvoiceItemType>({ _id: "", category: "", item: "", value: ""})
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});
  const [showToast, setShowToast] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<IData>(`http://localhost:4000/api/expenses/${username}/${date}/${card}`, fetcher)

  useEffect(() => {
    if (!data) return;
    setName(data.data.length ? data.data[0].name : "Eu");
  }, [data]);
  
  if (!data || error) {
    return null;
  }

  const handleToast = (error: boolean, message: string) => {
    setToastCustom({ error, message })
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000);
  }

  const openModal = (invoice: IInvoiceItemType, modal: "edit" | "delete") => {
    setItemUpdate({ _id: invoice._id, category: invoice.category, item: invoice.item, value: invoice.value })

    if (modal === "edit") {
      setIsModalEditOpen(true)
    } else {
      setIsModalDeleteOpen(true)
    }
  };

  const closeModal = () => {
    setIsModalEditOpen(false);
    setIsModalDeleteOpen(false)
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isModalEditOpen) {
      try {
        const response = await fetcherPost<IInvoiceItemType, { message: string }>(
          "http://localhost:4000/api/expenses", 
          "PUT", 
          itemUpdate
        );
        handleToast(true, response.message)
        closeModal();
        mutate();
      } catch (err) {
        handleToast(false, (err as Error).message);
      }
    } else {
      try {
        const response = await fetcherPost<IInvoiceItemType, { message: string }>(
          `http://localhost:4000/api/expenses/${itemUpdate._id}`, 
          "DELETE", 
        );
        handleToast(true, response.message)
        closeModal();

        console.log(data.data)

        if (data.data[0].invoices.length === 1 && onDismiss) {
          onDismiss()
          return;
        }
        
        mutate();
      } catch (err) {
        handleToast(false, (err as Error).message);
      }
    }
  }

  const invoiceByName = data.data.filter((item) => item.name === name)
  const cardName = card.replace("%20", " ")

  return (
    <>
      {showToast && (
        <Toast message={toastCustom.message} success={toastCustom.error} />
      )}
      <Modal background={backgroundColor} onCustomDismiss={onDismiss}>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            {data.data.length && invoiceByName.length && (
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
              onChange={({ target }) => setItemUpdate(prev => ({ ...prev, item: target.value }))}
              required
              type="text" 
              value={itemUpdate.item}
            />

            <Input
              data-testid="value"
              label="Valor (R$)"
              name="value"
              onChange={({ currentTarget }) => setItemUpdate(prev => ({ ...prev, value: formatCurrency(currentTarget.value) }))}
              required
              type="text" 
              value={itemUpdate.value}
            />

            <Select 
              id='category' 
              label='Categoria' 
              className={"modal-form__select"}
              defaultValue={itemUpdate.category}
              onChange={({ currentTarget }) => setItemUpdate(prev => ({ ...prev, category: currentTarget.value }))}
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