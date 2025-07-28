import React, { useMemo } from 'react';

import styles from "../../../styles/components/credit-card/credit-card.module.scss"

import Card from './card';

import { parseCurrencyString } from '@/utils';

import { BillOutput, Expense } from '@/dto/billDTO';
import { CardDTOOutput as CardDTO } from '@/dto/cardDTO';
import Link from 'next/link';

type InvoiceCard = {
  name: string;
  color: string;
  total: number;
}

const invoiceByCard = (expenses: BillOutput[], cards: CardDTO[]) => {
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

export default function CreditCard({ data, date }: { data: Expense, date: { month: string, year: string} }) {
  const { cards, expenses } = data;

  const invoices = useMemo(() => invoiceByCard(expenses, cards), [expenses, cards]);

  return (
    <div className={styles.card}>
      <h1 className='title'>Cartões</h1>

      {!cards.length ? (
        <div className="empty">
          <p className='subtitle'>Nenhum cartão encontrado.</p>
        </div>
      ) : (
        <div className={styles.container}>
          {invoices.map((card, index) => (
            <Link 
              key={index} 
              href={`/invoice/${card.name}/${date.month}${date.year}`} 
              scroll={false}
              prefetch={false}
            >
              <Card name={card.name} color={card.color} totalInvoice={card.total} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}