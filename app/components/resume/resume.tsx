import React from 'react';

import styles from "../../styles/components/resume.module.scss"

import { formatToCurrencyBRL, parseCurrencyString } from '@/app/utils';
import { Data } from '@/app/utils/types';

export default function Resume({ salary, data }: { salary: string, data: Data[] }) {
  if (!data || !data.length) return;
  
  const getAllExpenses = data.filter(expense =>  expense.people === "Eu")
  const totalAccount = getAllExpenses.reduce((a, b) => a + parseCurrencyString(b.value), 0)
  const remaining = parseCurrencyString(salary) - totalAccount;

  return (
    <div className="content_card">
      <h1 className='content_card__title'>resumo financeiro</h1>

      <div className={styles.resume}>
        <div className={styles.account_payable}>
          <div>
            <p className={styles.title}>salário</p>
            <p className={`${styles.value} ${styles.salary}`}>
              {salary}
            </p>
          </div>
          <div>
            <p className={styles.title}>contas</p>
            <p className={`${styles.value} ${styles.negative}`}>
              {formatToCurrencyBRL(totalAccount)}
            </p>
          </div>
        </div>
        <div>
          <p className={styles.title}>saldo restante</p>
          <p className={`${styles.value} ${remaining > 0 ? styles.remaining : styles.negative}`}>
            {formatToCurrencyBRL(remaining)}
          </p>
        </div>
      </div>
    </div>
  );
}