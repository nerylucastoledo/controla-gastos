import React from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import styles from "../../styles/loading.module.scss"

const Loading = () => {
  return (
    <div className={styles.loading} data-testid="loading">
      <AiOutlineLoading3Quarters color='#fff' size={48} width={48} height={48} />
    </div>
  )
}

export default Loading
