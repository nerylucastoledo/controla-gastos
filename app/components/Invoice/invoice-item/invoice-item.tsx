"use client"

import React from 'react'

import styles from "../../../styles/components/invoice-item.module.scss"

import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

interface Params {
  data: InvoiceData[];
  openModal: (card: InvoiceData, modal: "edit" | "delete") => void
}

interface InvoiceData {
  _id: string
  item: string,
  value: string,
  category: string,
}

export const InvoiceItem = ({ data, openModal }: Params) => {
  return (
    <>
      {data.map((invoice, index) => (
        <div key={`${invoice.item}-${index}`} className={styles.container}>
          <div>
            <p>{invoice.item}</p>
            <div>
              <button onClick={() => openModal(invoice, 'edit')}><FaEdit size={16} color='red' /></button>
              <button onClick={() => openModal(invoice, 'delete')}><MdDeleteForever size={16} color='#000080' /></button>
            </div>
          </div>
          <p>{invoice.value}</p>
        </div>
      ))}
    </>
  )
}
