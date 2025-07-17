import React, { useMemo } from 'react'

import styles from "../../styles/components/person-expense/person-expense.module.scss"
import { BillDTO } from '@/app/dto/bill'
import { formatToCurrencyBRL, parseCurrencyString } from '@/app/utils';

type InvoicePeople = {
  name: string;
  total: number;
}

const invoiceByPeople = (expenses: BillDTO[]) => {
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

export default function PersonExpense({ data }: { data: BillDTO[] }) {
  
  const invoices = useMemo(() => invoiceByPeople(data), [data]);

  return (
    <div className={styles.personExpense}>
      <h1 className='title'>Gasto por pessoa</h1>

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
    </div>
  )
}
