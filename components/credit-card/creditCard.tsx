import React, { useMemo } from 'react';

import styles from "../../styles/components/credit-card/credit-card.module.scss"

import Card from './card';

import { parseCurrencyString } from '@/utils';

import { Expense } from '@/dto/expenseDTO';
import { Bill } from '@/dto/billDTO';
import { Card as CardDTO } from '@/dto/cardDTO';

type InvoiceCard = {
  name: string;
  color: string;
  total: number;
}

const invoiceByCard = (expenses: Bill[], cards: CardDTO[]) => {
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