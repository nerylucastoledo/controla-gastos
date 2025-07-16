import React from 'react'

import styles from "../../styles/components/budget-summary/budget-summary.module.scss"

export const BudgetSummary = () => {

  return (
    <div className={styles.budget}>
      <h1 className='title'>Resumo</h1>
      
      <div className={styles.container}>
        <div className={styles.item}>
          <h2>Sálario</h2>
          <p>R$ 2.158.250,98</p>
        </div>

        <div className={styles.item}>
          <h2>Gastos</h2>
          <p>R$ 5.250,98</p>
        </div>

        <div className={styles.item}>
          <h2>Valor restante</h2>
          <p className={styles.positive}>R$ 5.250,98</p>
        </div>
      </div>
    </div>
  )
}
