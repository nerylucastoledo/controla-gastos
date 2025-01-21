"use client"

import React, { useEffect, useState } from 'react'
import useSWR from "swr";

import styles from "../../styles/components/invoice.module.scss";
import stylesModal from "../../styles/components/modal-form.module.scss"

import { InvoicePeople } from './invoice-people/invoice-people';
import { InvoiceItem } from './invoice-item/invoice-item';
import { Input } from '../input/input';
import Modal from '@/app/components/modal/modal';
import Loading from '@/app/components/loading/loading';

import { fetcher, formatToCurrencyBRL } from '@/app/utils';

interface Params {
  username: string;
  date: string;
  card: string;
  backgroundColor: string;
  onDismiss?: () => void;
}

interface InvoiceItemType {
  _id: string
  item: string,
  value: string,
  category: string,
}

interface Invoice {
  name: string,
  invoices: InvoiceItemType[],
  totalInvoice: number
}

export default function InvoiceModal({ username, date, card, backgroundColor, onDismiss }: Params) {
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [item, setItem] = useState("")
  const [value, setValue] = useState("")
  const [name, setName] = useState<string>("");

  const { data, error, isLoading } = useSWR<Invoice[]>(`http://localhost:4000/api/expenses/${username}/${date}/${card}`, fetcher)

  useEffect(() => {
    if (data && data.length > 0) {
      setName(data[0].name);
    }
  }, [data]);
  
  if (!data || error) {
    return (
      <p>Ocorreu um erro</p>
    )
  }

  const dataByName = data.filter((item) => item.name === name)
  const cardName = card.replace("%20", " ")

  const openModal = (card: InvoiceItemType, modal: "edit" | "delete") => {
    setItem(card.item)
    setValue(card.value)

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

  const submit = () => {
  }

  return (
    <>
      <Modal background={backgroundColor} onCustomDismiss={onDismiss}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {data.length && dataByName.length && (
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
                      data={dataByName[0].invoices} 
                      openModal={openModal}
                    />
                  </div>
                </div>
                <p className={styles.total}>
                  Total: {formatToCurrencyBRL(dataByName[0].totalInvoice)}
                </p>
              </div>
            )}
          </>
        )}
      </Modal>

      {isModalEditOpen && (
        <Modal
          background='#0F0F1B'
          customClass={`modal-form-active ${stylesModal.modal_form}`}
          onCustomDismiss={closeModal}
        >
          <h2>Atualizar o gasto</h2>
          <form onSubmit={submit}>
            <Input
              label="Item"
              type="text" 
              required
              name="item"
              value={item}
              onChange={({ target }) => setItem(target.value)}
            />
            <Input
              label="Valor (R$)"
              type="text" 
              required
              name="valor"
              value={value}
              onChange={({ target }) => setValue(target.value)}
            />

            <input type="submit" value="Atualizar" className="button button__primary"/>
          </form>
        </Modal>
      )}

      {isModalDeleteOpen && (
        <Modal
          background='#0F0F1B'
          customClass={`modal-form-active ${stylesModal.modal_form}`}
          onCustomDismiss={closeModal}
        >
          <h2>Deletar o gasto</h2>
          <p>Após deletar não será possível recuperar <br></br> tem certeza que quer deletar a(o) <b>{item}</b>?</p>
          <button id='delete' className={`button button__primary ${stylesModal.button}`}>Deletar</button>
        </Modal>
      )}
    </>
  )
}