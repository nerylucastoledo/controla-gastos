import React, { useCallback } from 'react';

import styles from "../../styles/components/report.module.scss"

import { IExpense } from '@/app/utils/types';
import { formatToCurrencyBRL, parseCurrencyString } from '@/app/utils';

interface IProps {
  data: IExpense[];
}

interface IInvoice {
  people: string;
  value: number;
}

export const Report = ({ data }: IProps) => {
  
  const getInvoice = useCallback((data: IExpense[]) => {
    const result = data.reduce<IInvoice[]>((acc, expense) => {
      const people = expense.people;
      const value = parseCurrencyString(expense.value);
      const existingPeople = acc.find(item => item.people === people);

      if (existingPeople) {
        existingPeople.value += value;
      } else {
        acc.push({ people, value });
      }

      return acc;
    }, []);

    return result;
  }, [])


  const invoices = getInvoice(data)
  return (
    <div className="content_card">
      <h1 className='content_card__title'>fatura</h1>

      {!data.length ? (
          <div className='empty'>
            <p>nada até o momento</p>
          </div>
        ) : (
          <div className={styles.report}>
            <ul>
              {invoices.map(invoice => (
                <li key={invoice.people}>
                  <p>
                    <span>{invoice.people}</span>
                    <span>{formatToCurrencyBRL(invoice.value)}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
}