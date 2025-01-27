import React from 'react'
import { FaRegEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

interface People {
  _id: string;
  name: string;
  username: string;
}

interface Card {
  _id: string;
  name: string;
  username: string;
  color: string;
}

type DataType = People | Card;

export default function List({data, openModal}: {data: DataType[], openModal: (item: People | Card, operation: "PUT" | "DELETE") => void }) {
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
