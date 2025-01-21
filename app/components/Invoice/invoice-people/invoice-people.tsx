import React from 'react'

import styles from "../../../styles/components/invoice-people.module.scss";

interface Props {
  name: string, 
  nameActive: string, 
  setName: React.Dispatch<React.SetStateAction<string>>
}

export const InvoicePeople = ({ name, nameActive, setName }: Props) => {
  return (
    <div 
      className={`${styles.container } ${name === nameActive ? styles.active : ""}`} 
      onClick={() => setName(name)}
    >
      {name}
    </div>
  )
}
