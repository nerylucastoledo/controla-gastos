"use client"

import React from 'react'

import { IoIosClose } from "react-icons/io";

import styles from "../../styles/components/modal/modal-action.module.scss"

type ModalEditProps = {
  handleCloseModal: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function ModalAction({ handleCloseModal, title, subtitle, children }: ModalEditProps) {
  return (
    <div className={`modal ${styles.modalAction}`}>
      <div className={`container ${styles.container}`}>
        <button className={styles.closeButton} onClick={handleCloseModal}>
          <IoIosClose size={30} />
        </button>

        {(title || subtitle) && (
          <div className={`${styles.header} ${styles.headerDelete}`}>
            <h2>{title}</h2>

            <p>{subtitle}</p>
          </div>
        )}

        { children }
      </div>
    </div>
  )
}
