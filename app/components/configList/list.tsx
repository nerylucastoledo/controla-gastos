"use client"

import React from 'react'

import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

import { ICard, IPeople } from '@/app/utils/types';

type DataType = IPeople | ICard;

interface IProps {
  data: DataType[];
  openModal: (item: IPeople | ICard, operation: "PUT" | "DELETE") => void;
}

export const ConfigList = ({ data, openModal }: IProps) => {
  return (
    <div>
      {data.length && data.map((item) => (
        <div key={item.name}>
          {item.name}
          <div>
            <button onClick={() => openModal(item, "PUT")} data-testid="edit-button"><FaRegEdit size={16} color='#28A745' /></button>
            <button onClick={() => openModal(item, "DELETE")} data-testid="delete-button"><MdDeleteForever size={16} color='#DC3545' /></button>
          </div>
        </div>
      ))}
    </div>
  )
}
