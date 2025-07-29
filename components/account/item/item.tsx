"use client"

import React from 'react'

import styles from "../../../styles/components/account/item.module.scss";

import { MdDeleteForever } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { PeopleDTOOutput } from '@/dto/peopleDTO';
import { CardDTOOutput } from '@/dto/cardDTO';

type ModalActionType = {
  show: boolean;
  type: "edit" | "delete" | null;
  item: CardDTOOutput | PeopleDTOOutput | null;
}

type ItemProps = {
  icon: React.ReactNode;
  item: CardDTOOutput | PeopleDTOOutput;
  setModalAction: React.Dispatch<React.SetStateAction<ModalActionType>>;
}

export default function Item({ icon, item, setModalAction }: ItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        {icon}

        <h3>{item.name}</h3>
      </div>

      <div className={styles.actions}>
        <button
          className={styles.edit} 
          onClick={() => setModalAction({ show: true, type: "edit", item })}
        >
          <MdModeEditOutline size={20} color='#fff' />
        </button>
        <button 
          className={styles.delete}
          onClick={() => setModalAction({ show: true, type: "delete", item })}
        >
          <MdDeleteForever size={20} color='#fff' />
        </button>
      </div>
    </div>
  )
};
