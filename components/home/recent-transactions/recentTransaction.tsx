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
              <div key={index} className={styles.item} data-testid="transaction-item">
                <div className={styles.icon}>
                  <Icon name={transaction.category as keyof typeof Icon} color="var(--black)" />
                </div>

                <div className={styles.content}>
                  <div className={styles.details}>
                    <h2>{transaction.item}</h2>
                    
                    <div>
                      <p data-testid="transaction-people" className={styles.people}>{transaction.people}</p>
                      <p data-testid="transaction-category" className={styles.category}>{transaction.category}</p>
                      {transaction.card && (
                        <p data-testid="transaction-card" className={styles.card}>{transaction.card}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <p data-testid="transaction-value" className={styles.value}>-{transaction.value}</p>
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
