import React from 'react';

import styles from "../../styles/resume.module.scss"
import { Data } from '@/app/utils/types';
import { useUser } from '@/app/context/user';
import { formatToCurrencyBRL, parseCurrencyString } from '@/app/utils';
import Loading from '../loading/loading';

export default function Resume({ loading, data }: { loading: boolean, data: Data[] }) {
  const { salary }  = useUser()

  const getAllExpenses = data.filter(expense =>  expense.people === "Eu")
  const totalAccount = getAllExpenses.reduce((a, b) => a + parseCurrencyString(b.value), 0)
  const remaining = parseCurrencyString(salary) - totalAccount;

  return (
    <div className="content_card">
      <h1 className='content_card__title'>resumo financeiro</h1>

      <div className={styles.resume}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className={styles.resume__account_payable}>
              <div>
                <p className={styles.resume_title}>salário</p>
                <p className={`${styles.resume_value} ${styles.resume_value__salary}`}>
                  {salary}
                </p>
              </div>
              <div>
                <p className={styles.resume_title}>contas</p>
                <p className={`${styles.resume_value} ${styles.resume_value__negative}`}>
                  {formatToCurrencyBRL(totalAccount)}
                </p>
              </div>
            </div>
            <div>
              <p className={styles.resume_title}>saldo restante</p>
              <p className={`${styles.resume_value} ${remaining > 0 ? styles.resume_value__remaining : styles.resume_value__negative}`}>
                {formatToCurrencyBRL(remaining)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}