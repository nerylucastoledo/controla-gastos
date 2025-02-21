import React from 'react'

import styles from "../../styles/pages/home.module.scss";

export const Error = ({ mutate }: { mutate: () => void }) => {
  return (
    <div className={styles.container_home}>
      <div className={styles.container_home_error}>
        <h1>Tivemos um problema para carregar seus dados! Você pode clicar no botão abaixa e tentar novamente :)</h1>
        <button className="button" onClick={() => mutate()}>Recarregar</button>
      </div>
    </div>
  )
}
