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
      {data.length && data.map((people) => (
        <p key={people.name}>
          {people.name}
          <div>
            <button onClick={() => openModal(people, "PUT")} data-testid="edit-button"><FaRegEdit size={16} color='28A745' /></button>
            <button onClick={() => openModal(people, "DELETE")} data-testid="delete-button"><MdDeleteForever size={16} color='#DC3545' /></button>
          </div>
        </p>
      ))}
    </div>
  )
}
