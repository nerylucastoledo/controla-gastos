import React, { useMemo } from 'react'

import styles from "../../../styles/components/person-expense/person-expense.module.scss"

import { formatToCurrencyBRL, parseCurrencyString } from '@/utils';
import { BillDTOOutput } from '@/dto/billDTO';

type InvoicePeople = {
  name: string;
  total: number;
}

const invoiceByPeople = (expenses: BillDTOOutput[]) => {
  const invoice = expenses.reduce((acc, expense) => {
    if (!acc[expense.people]) {
      acc[expense.people] = { 
        name: expense.people,
        total: parseCurrencyString(expense.value)
      };

      return acc;
    }

    acc[expense.people].total += parseCurrencyString(expense.value);
    return acc;
  }, {} as Record<string, InvoicePeople>);

  return Object.values(invoice);
};

export default function PersonExpense({ data }: { data: BillDTOOutput[] }) {
  
  const invoices = useMemo(() => invoiceByPeople(data), [data]);

  return (
    <div className={styles.personExpense}>
      <h1 className='title'>Gasto por pessoa</h1>

      {!invoices.length ? (
        <div className="empty">
          <p className='subtitle'>Nenhum gasto encontrado.</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Pessoa</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.name}>
                <td>{invoice.name}</td>
                <td>{formatToCurrencyBRL(invoice.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
