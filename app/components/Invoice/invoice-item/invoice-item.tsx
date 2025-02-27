"use client"

import React from 'react'

import styles from "../../../styles/components/invoice-item.module.scss"

import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface IProps {
  data: IInvoiceData[];
  openModal: (card: IInvoiceData, modal: "edit" | "delete") => void
}

interface IInvoiceData {
  _id: string
  category: string,
  item: string,
  value: string,
}

export const InvoiceItem = ({ data, openModal }: IProps) => {
  return (
    <>
      {data.map((invoice, index) => (
        <div key={`${invoice.item}-${index}`} className={styles.container}>
          <div>
            <p>{invoice.item}</p>
            <div>
              <button 
                onClick={() => openModal(invoice, 'edit')} 
                data-testid="edit-button"
              >
                <FaEdit size={16} color='28A745' />
              </button>
              <button 
                onClick={() => openModal(invoice, 'delete')} 
                data-testid="delete-button"
              >
                <MdDeleteForever size={16} color='#DC3545' />
              </button>
            </div>
          </div>
          <p>{invoice.value}</p>
        </div>
      ))}
    </>
  )
}
