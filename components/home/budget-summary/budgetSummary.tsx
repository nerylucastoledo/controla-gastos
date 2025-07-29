"use client";

import React, { useMemo } from 'react'

import styles from "../../../styles/components/budget-summary/budget-summary.module.scss"

import { formatToCurrencyBRL, parseCurrencyString } from '@/utils';
import { BillDTOOutput } from '@/dto/billDTO';

const totalInvoice = (expenses: BillDTOOutput[] | null) => {
  if (!expenses) return 0;

  const invoice = expenses.reduce((acc, expense) => {
    if (expense.people === "Eu") {
      acc += parseCurrencyString(expense.value)
      return acc;
    }

    return acc;
  }, 0);

  return invoice;
};

export default function BudgetSummary({ data }: { data: BillDTOOutput[] | null }) {
  const salary = Number(localStorage.getItem("salary") ?? 0);
  const total = useMemo(() => totalInvoice(data), [data]);
  const remaining = salary - total;
  
  return (
    <div className={styles.budget}>
      <h1 className='title'>Resumo</h1>
      
      <div className={styles.container}>
        <div className={styles.item}>
          <h2>Sálario</h2>
          <p>{formatToCurrencyBRL(salary)}</p>
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
