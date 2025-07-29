import React from "react"

import styles from "../../../styles/pages/skeleton/new-option.module.scss";

export default function SkeletonNewOptionPage() {
  return (
    <div className={styles.skeletonNewOptionPage}>
      {/* Título 1 */}
      <div className={`${styles.skeletonTitle}`} />

      {/* Selects */}
      <div className={styles.skeletonRow}>
        <div className={styles.skeletonSelect} />
        <div className={styles.skeletonSelect} />
      </div>

      {/* Input 1 */}
      <div className={`${styles.skeletonLabel}`} />
      <div className={`${styles.skeletonInput}`} />

      {/* Input 2 */}
      <div className={`${styles.skeletonLabel}`} />
      <div className={`${styles.skeletonInput} ${styles.skeletonInputCard}`} />

      <div className={`${styles.skeletonButton}`} />
    </div>
  )
}
