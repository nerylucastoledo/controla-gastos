import React from 'react'

import styles from "../../styles/components/loading.module.scss"

import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const LoadingICon = () => {
  return (
    <div className={styles.loading} data-testid="loading">
      <AiOutlineLoading3Quarters color='#fff' size={48} width={48} height={48} />
    </div>
  )
}
