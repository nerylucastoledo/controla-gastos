import React, { useMemo } from 'react'

import styles from "../../styles/components/budget-summary/budget-summary.module.scss"
import { BillDTO } from '@/app/dto/bill';
import { formatToCurrencyBRL, parseCurrencyString } from '@/app/utils';

const totalInvoice = (expenses: BillDTO[]) => {
  const invoice = expenses.reduce((acc, expense) => {
    if (expense.people === "Eu") {
      acc += parseCurrencyString(expense.value)
      return acc;
    }

    return acc;
  }, 0);

  return invoice;
};

export const BudgetSummary = ({ data }: { data: BillDTO[] }) => {
  const total = useMemo(() => totalInvoice(data), [data]);
  const remaining = 10000 - total;

  return (
    <div className={styles.budget}>
      <h1 className='title'>Resumo</h1>
      
      <div className={styles.container}>
        <div className={styles.item}>
          <h2>Sálario</h2>
          <p>R$ 2.158.250,98</p>
        </div>

        <div className={styles.item}>
          <h2>Gastos</h2>
          <p className={styles.negative}>
            {formatToCurrencyBRL(total)}
          </p>
        </div>

        <div className={styles.item}>
          <h2>Valor restante</h2>
          <p className={remaining > 0 ? styles.positive : styles.negative}>
            {formatToCurrencyBRL(remaining)}
          </p>
        </div>
      </div>
    </div>
  )
}
