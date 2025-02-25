import React from 'react';

import styles from "../styles/components/skeleton.module.scss";

const Loading = ({ cardCount = 6, lineCount = 4 }) => {
  return (
    <div className={styles.skeleton}>
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