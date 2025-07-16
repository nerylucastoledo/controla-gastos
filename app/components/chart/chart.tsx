import React from 'react'

import styles from "../../styles/components/chart/chart.module.scss"

export default function Chart() {
  return (
    <div className={styles.chart}>
      <h1 className='title'>Gráficos</h1>

      <div className={styles.container}>
        <p>Gráfico de despesas</p>
        <p>Gráfico de receitas</p>
        <p>Gráfico de saldo</p>
      </div>
    </div>
  )
}
