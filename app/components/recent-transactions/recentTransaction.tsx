import React from 'react'

import styles from "../../styles/components/recent-transaction/recent-transaction.module.scss"
import Icon from '../icon/icon'
import { BillDTO } from '@/app/dto/bill'

export default function RecentTransaction({ data }: { data: BillDTO[] }) {
  const lastTransactions = data.reverse().slice(0, 10);

  return (
    <div className={styles.recentTransaction}>
      <h1 className='title'>Transações recentes</h1>

      <div className={styles.container}>
        {lastTransactions.map((transaction, index) => (
          <div key={index} className={styles.item}>
            <Icon name={transaction.category} color="#9CABBA" />
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
              <td><Icon name={transaction.category} color="#9CABBA" /> {transaction.category}</td>
              <td>{transaction.item}</td>
              <td>{transaction.value}</td>
              <td>{transaction.people}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
