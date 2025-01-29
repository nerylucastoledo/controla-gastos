"use client"

import React, { useEffect, useState } from 'react'
import useSWR from "swr";

import styles from "../../styles/components/invoice.module.scss";

import { InvoicePeople } from './invoice-people/invoice-people';
import { InvoiceItem } from './invoice-item/invoice-item';
import { Input } from '../input/input';
import Modal from '@/app/components/modal/modal';
import Loading from '@/app/components/loading/loading-icon';

import { categorys, fetcher, fetcherPost, formatCurrency, formatToCurrencyBRL } from '@/app/utils';
import Toast from '../toast/toast';
import { Select } from '../select/select';

interface IProps {
  username: string;
  date: string;
  card: string;
  backgroundColor: string;
  onDismiss?: () => void;
}

interface IInvoiceItemType {
  _id: string
  item: string,
  value: string,
  category: string,
}

interface IInvoice {
  name: string,
  invoices: IInvoiceItemType[],
  totalInvoice: number
}

export const InvoiceModal = ({ username, date, card, backgroundColor, onDismiss }: IProps) => {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [itemUpdate, setItemUpdate] = useState<IInvoiceItemType>({ _id: "", category: "", item: "", value: ""})
  const [toastCustom, setToastCustom] = useState({ error: true, message: ""});
  const [showToast, setShowToast] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<IInvoice[]>(`http://localhost:4000/api/expenses/${username}/${date}/${card}`, fetcher)

  useEffect(() => {
    if (!data) return;
    setName(data.length ? data[0].name : "Eu");
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
        mutate(); 
      } catch (err) {
        handleToast(false, (err as Error).message);
      }
    }
  }

  const invocieByName = data.filter((item) => item.name === name)
  const cardName = card.replace("%20", " ")

  return (
    <>
      {showToast && (
        <Toast success={toastCustom.error} message={toastCustom.message} />
      )}
      <Modal background={backgroundColor} onCustomDismiss={onDismiss}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data.length && invocieByName.length && (
              <div className={styles.invoice}>
                <div className={styles.title}>
                  {cardName}
                </div>
                
                <div className={styles.container}>
                  <div className={styles.people}>
                    {data.map((people) => (
                      <InvoicePeople 
                        name={people.name} 
                        nameActive={name} 
                        setName={setName} 
                        key={people.name}
                      />
                    ))}
                  </div>

                  <div className={styles.item}>
                    <InvoiceItem
                      data={invocieByName[0].invoices} 
                      openModal={openModal}
                    />
                  </div>
                </div>
                
                <p className={styles.total}>
                  Total: {formatToCurrencyBRL(invocieByName[0].totalInvoice)}
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
              label="Item"
              type="text" 
              name="item"
              data-testid="item"
              required
              value={itemUpdate.item}
              onChange={({ target }) => setItemUpdate(prev => ({ ...prev, item: target.value }))}
            />

            <Input
              label="Valor (R$)"
              type="text" 
              name="value"
              data-testid="value"
              required
              value={itemUpdate.value}
              onChange={({ currentTarget }) => setItemUpdate(prev => ({ ...prev, value: formatCurrency(currentTarget.value) }))}
            />

            <Select 
              id='category' 
              label='Categoria' 
              defaultValue={itemUpdate.category}
              className={"modal-form__select"}
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