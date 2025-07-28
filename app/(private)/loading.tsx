import React from "react"

import styles from "../../styles/pages/skeleton/home.module.scss";

export default function SkeletonHomePage() {
  return (
    <div className={styles.skeletonHomepage}>
      {/* Selects */}
      <div className={styles.skeletonRow}>
        <div className={styles.skeletonSelect} />
        <div className={styles.skeletonSelect} />
      </div>

      {/* Título 1 */}
      <div className={`${styles.skeletonBox} ${styles.title}`} />

      {/* Cards */}
      <div className={`${styles.skeletonRow} ${styles.cards}`}>
        <div className={`${styles.skeletonBox} ${styles.card}`} />
        <div className={`${styles.skeletonBox} ${styles.card}`} />
        <div className={`${styles.skeletonBox} ${styles.card}`} />
      </div>

      {/* Título 2 */}
      <div className={`${styles.skeletonBox} ${styles.title}`} />

      {/* Tabela */}
      <div className={`${styles.skeletonBox} ${styles.table}`} />

      {/* Título 3 */}
      <div className={`${styles.skeletonBox} ${styles.title}`} />

      {/* Gráfico / componente final */}
      <div className={`${styles.skeletonBox} ${styles.chart}`} />
    </div>
  )
}
