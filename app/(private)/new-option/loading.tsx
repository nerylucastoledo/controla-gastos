import React from "react"

import styles from "../../../styles/pages/skeleton/new-expense.module.scss";

export default function SkeletonNewExpensePage() {
  return (
    <div className={styles.skeletonNewExpensePage}>
      {/* Título 1 */}
      <div className={`${styles.skeletonTitle}`} />

      {/* Selects */}
      <div className={styles.skeletonRow}>
        <div className={styles.skeletonSelect} />
        <div className={styles.skeletonSelect} />
      </div>

      {/* Select 1 */}
      <div className={`${styles.skeletonLabel}`} />
      <div className={`${styles.skeletonInput}`} />

      {/* Select 2 */}
      <div className={`${styles.skeletonLabel}`} />
      <div className={`${styles.skeletonInput}`} />

      {/* Select 3 */}
      <div className={`${styles.skeletonLabel}`} />
      <div className={`${styles.skeletonInput}`} />

      {/* Input 1 */}
      <div className={`${styles.skeletonLabel}`} />
      <div className={`${styles.skeletonInput}`} />

      {/* Input 2 */}
      <div className={`${styles.skeletonLabel}`} />
      <div className={`${styles.skeletonInput}`} />

      {/* Botao */}
      <div className={`${styles.skeletonLabel}`} />
      <div className={`${styles.skeletonButton}`} />
    </div>
  )
}
