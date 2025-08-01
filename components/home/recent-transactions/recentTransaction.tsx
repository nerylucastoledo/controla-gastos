import React from 'react'

import styles from "../../../styles/components/recent-transaction/recent-transaction.module.scss"

import Icon from '../../icon/icon'
import { BillDTOOutput } from '@/dto/billDTO';

export default function RecentTransaction({ data }: { data: BillDTOOutput[] }) {
  const lastTransactions = data.slice(-10).reverse();

  return (
    <div className={styles.recentTransaction}>
      <h2 className={styles.title}>Últimas movimentações</h2>

      {!data || data.length === 0 ? (
        <div className="empty">
          <p className='subtitle'>Nenhuma transação encontrada.</p>
        </div>
      ) : (
        <>
          <div className={styles.container}>
            {lastTransactions.map((transaction, index) => (
              <div key={index} className={styles.item}>
                <div className={styles.icon}>
                  <Icon name={transaction.category as keyof typeof Icon} color="var(--black)" />
                </div>

                <div className={styles.content}>
                  <div className={styles.details}>
                    <h2>{transaction.item}</h2>
                    
                    <div>
                      <p className={styles.people}>{transaction.people}</p>
                      <p className={styles.category}>{transaction.category}</p>
                    </div>
                  </div>

                  <div>
                    <p className={styles.value}>-{transaction.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
