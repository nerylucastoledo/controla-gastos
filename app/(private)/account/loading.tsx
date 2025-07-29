import React from "react"

import styles from "../../../styles/pages/skeleton/account.module.scss"

export default function SkeletonAccountPage() {
  return (
    <div className={styles.skeletonAccountPage}>
      {/* Título 1 */}
      <div className={`${styles.skeletonTitle}`} />

      {/* Selects */}
      <div className={styles.skeletonRow}>
        <div className={styles.skeletonSelect} />
        <div className={styles.skeletonButton} />
      </div>

      {/* Card 1 */}
      <div className={`${styles.skeletonLabel}`} />
      <div className={`${styles.skeletonCard}`} />

      {/* Card 2 */}
      <div className={`${styles.skeletonCard}`} />

      {/* Card 3 */}
      <div className={`${styles.skeletonCard}`} />

      {/* Card 4 */}
      <div className={`${styles.skeletonCard}`} />

      {/* Card 5 */}
      <div className={`${styles.skeletonCard}`} />

      {/* Card 6 */}
      <div className={`${styles.skeletonCard}`} />

      {/* Card 7 */}
      <div className={`${styles.skeletonCard}`} />

      {/* Card 1 */}
      <div className={`${styles.skeletonLabel}`} />
      <div className={`${styles.skeletonCard}`} />

      {/* Card 3 */}
      <div className={`${styles.skeletonCard}`} />

      {/* Card 4 */}
      <div className={`${styles.skeletonCard}`} />

      {/* Card 5 */}
      <div className={`${styles.skeletonCard}`} />
    </div>
  )
}
