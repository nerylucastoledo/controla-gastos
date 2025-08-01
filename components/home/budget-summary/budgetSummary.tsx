"use client";

import React, { useEffect, useMemo } from 'react'

import styles from "../../../styles/components/budget-summary/budget-summary.module.scss"

import { formatToCurrencyBRL, parseCurrencyString } from '@/utils';
import { BillDTOOutput } from '@/dto/billDTO';

import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuWallet } from "react-icons/lu";


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
  const [salary, setSalary] = React.useState(0);
  const total = useMemo(() => totalInvoice(data), [data]);
  const remaining = salary - total;

  useEffect(() => {
      const storedSalary = localStorage.getItem('salary');
  
      if (storedSalary) {
        setSalary(Number(storedSalary));
      }
    }, []);
  
  return (
    <div className={styles.budget}>
      <div className={styles.container}>
        <div className={styles.item}>
          <p className={styles.title}>Receita</p>
          <p className={`${styles.value} ${styles.positive}`}>
            {formatToCurrencyBRL(salary)}
            <span><FaArrowTrendUp size={24} color='var(--green-dark)' /></span>
          </p>
        </div>

        <div className={styles.item}>
          <p className={styles.title}>Despesas</p>
          <p className={`${styles.value} ${styles.negative}`}>
            {formatToCurrencyBRL(total)}
            <span><FaArrowTrendDown size={24} color='var(--red-dark)' /></span>
          </p>
        </div>

        <div className={styles.item}>
          <p className={styles.title}>Saldo</p>
          <p className={`${styles.value} ${remaining > 0 ? styles.positive : styles.negative}`}>
            {formatToCurrencyBRL(remaining)}
            <span>
              <LuWallet size={24} color={remaining > 0 ? "var(--green-dark)" : "var(--red-dark)"} />
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
