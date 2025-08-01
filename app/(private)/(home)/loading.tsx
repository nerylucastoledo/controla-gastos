import React from "react"

import styles from "../../../styles/pages/skeleton/home.module.scss";

export default function SkeletonHomePage() {
  return (
    <div className={styles.skeletonHomepage}>
      {/* Selects */}
      <div className={styles.skeletonRow}>
        <div className={styles.skeletonIcon} />
        <div className={styles.skeletonSelect} />
        <div className={styles.skeletonSelect} />
      </div>

      {/* Resume */}
      <div className={`${styles.skeletonRow} ${styles.resume}`}>
        <div className={styles.skeletonBox} />
        <div className={styles.skeletonBox} />
        <div className={styles.skeletonBox} />
      </div>


      {/* Last transactions */}
      <div className={styles.skeletonTransactions}>
        <div className={styles.skeletonTitle} />

        <div className={styles.skeletonRow}>
          <div className={styles.skeletonItem}></div>
          <div className={styles.skeletonItem}></div>
          <div className={styles.skeletonItem}></div>
          <div className={styles.skeletonItem}></div>
          <div className={styles.skeletonItem}></div>
        </div>
      </div>

      {/* Cards */}
      <div className={styles.skeletonTitle} />
      <div className={`${styles.skeletonRow} ${styles.cards}`}>
        <div className={`${styles.skeletonBox} ${styles.card}`} />
        <div className={`${styles.skeletonBox} ${styles.card}`} />
        <div className={`${styles.skeletonBox} ${styles.card}`} />
        <div className={`${styles.skeletonBox} ${styles.card}`} />
      </div>

      {/* Table */}
      <div className={styles.skeletonTitle} />
      <div className={`${styles.skeletonBox} ${styles.table}`} />

      {/* Chart */}
      <div className={styles.skeletonRow}>
        <div className={styles.chart} />
        <div className={styles.chart} />
      </div>
    </div>
  )
}
