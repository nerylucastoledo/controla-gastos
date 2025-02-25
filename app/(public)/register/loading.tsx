import React from 'react';

import styles from "../../styles/components/skeleton.module.scss";

const Loading = async ({ cardCount = 1, lineCount = 12 }) => {
  return (
    <div data-testid="loading-login" className={`${styles.skeleton} ${styles.skeletonRegister}`}>
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

export default Loading;