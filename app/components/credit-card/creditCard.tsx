import React, { useMemo } from 'react';

import styles from "../../styles/components/credit-card/credit-card.module.scss"

import Card from './card';

import { parseCurrencyString } from '@/app/utils';

import { Expense } from '@/app/dto/expenseDTO';
import { CardDTO } from '@/app/dto/cardDTO';
import { BillDTO } from '@/app/dto/bill';

type InvoiceCard = {
  name: string;
  color: string;
  total: number;
}

const invoiceByCard = (expenses: BillDTO[], cards: CardDTO[]) => {
  const invoice = expenses.reduce((acc, expense) => {
    if (!acc[expense.card]) {
      const color = cards.find(card => card.name === expense.card)

      acc[expense.card] = { 
        name: expense.card,
        color: color ? color.color : '#ccc',
        total: parseCurrencyString(expense.value)
      };

      return acc;
    }

    acc[expense.card].total += parseCurrencyString(expense.value);
    return acc;
  }, {} as Record<string, InvoiceCard>);

  return Object.values(invoice);
};

export default function CreditCard({ data }: { data: Expense }) {
  const { cards, expenses } = data;

  const invoices = useMemo(() => invoiceByCard(expenses, cards), [expenses, cards]);

  return (
    <div className={styles.card}>
      <h1 className='title'>Cartões</h1>

      {!cards.length ? (
        <p className={styles.empty}>Nenhum cartão cadastrado</p>
      ) : (
        <div className={styles.container}>
          {invoices.map((card, index) => (
            <Card key={index} name={card.name} color={card.color} totalInvoice={card.total} />
          ))}
        </div>
      )}
    </div>
  );
}