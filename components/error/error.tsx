import React from 'react'

import styles from "../../styles/components/error/error.module.scss";
import Image from 'next/image';

import errorImage from "../../images/error-image.webp";

export default function ErrorScreen() {
  return (
    <div className={styles.error}>
      <Image
        width={300}
        height={300}
        src={errorImage.src} 
        alt='Error'
      />
      <h1 className='title'>Oops! Aconteceu um erro</h1>
      <p>Nós tivemos um problema quando tentamos carregar os dados. Tente novamente mais tarde.</p>
      <button onClick={() => window.location.reload()}>Tentar novamente</button>
    </div>
  )
}
