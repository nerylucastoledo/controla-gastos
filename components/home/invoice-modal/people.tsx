import React from 'react'

import styles from "../../../styles/components/modal/invoice-modal.module.scss"

type PeopleProps = {
  names: string[];
  nameActive: string | null;
  setNameActive: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function People({ names, nameActive, setNameActive }: PeopleProps) {
  const uniqueNames = Array.from(new Set(names));

  const handleNameClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.textContent;
    setNameActive(name);
  };

  return (
    <div className={styles.people}>
      {uniqueNames.map(name => (
        <button 
          key={name}
          className={nameActive === name ? styles.active : ''}
          onClick={handleNameClick}
        >
          {name}
        </button>
      ))}
    </div>
  )
}
