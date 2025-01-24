import React from 'react';

import styles from "../styles/components/skeleton.module.scss";

const LoadingNewExpense = ({ cardCount = 1, lineCount = 11 }) => {
  return (
    <div data-testid="loading-new-expense" className={`${styles.skeleton} ${styles.skeletonNewExpense}`}>
      <div className={styles.container}>
        {[...Array(cardCount)].map((_, index) => (
          <div className={styles.card} key={index}>
            {[...Array(lineCount)].map((_, lineIndex) => (
              <div className={styles.card_line} key={lineIndex}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LoadingNewExpense;