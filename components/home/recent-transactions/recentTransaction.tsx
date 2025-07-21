import React from 'react'

import styles from "../../../styles/components/recent-transaction/recent-transaction.module.scss"

import Icon from '../../icon/icon'
import { Bill } from '@/dto/billDTO';

export default function RecentTransaction({ data }: { data: Bill[] }) {
  const lastTransactions = data.reverse().slice(0, 10);

  return (
    <div className={styles.recentTransaction}>
      <h1 className='title'>Transações recentes</h1>

      {!data || data.length === 0 ? (
        <div className="empty">
          <p className='subtitle'>Nenhuma transação encontrada.</p>
        </div>
      ) : (
        <>
          <div className={styles.container}>
            {lastTransactions.map((transaction, index) => (
              <div key={index} className={styles.item}>
                <Icon name={transaction.category as keyof typeof Icon} color="#9CABBA" />
                
                <div>
                  <h2>{transaction.item}</h2>
                  <p>{transaction.value}</p>
                  <p>{transaction.people}</p>
                </div>
              </div>
            ))}
          </div>

          <table>
            <thead>
              <tr>
                <th>Categoria</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Pessoa</th>
              </tr>
            </thead>
            <tbody>
              {lastTransactions.map((transaction, index) => (
                <tr key={index}>
                  <td><Icon name={transaction.category as keyof typeof Icon} color="#9CABBA" /> {transaction.category}</td>
                  <td>{transaction.item}</td>
                  <td>{transaction.value}</td>
                  <td>{transaction.people}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}
