"use client"

import React, { useCallback, useEffect, useState } from 'react';
import styles from "../../styles/components/card.module.scss"
import { CardItem } from './card-item';
import { CardData, Data } from '@/app/utils/types';
import Link from 'next/link';
import { formatToCurrencyBRL, parseCurrencyString } from '@/app/utils';

interface Props {
  username: string,
  date: string,
  data: Data[],
  cards: CardData[],
}

interface Invoice {
  card: string;
  value: number;
}

interface CardList extends CardData { 
  invoice: number;
}

export default function Card({ username, date, data, cards }: Props) {
  const [cardList, setCardList] = useState<CardList[]>([]);

  const filterByUniqueCards = (dataByMonth: Data[]) => {
    const cardSet = new Set<string>();
    dataByMonth.forEach((item) => cardSet.add(item.card));
    return Array.from(cardSet);
  };

  const totalInvoice = (dataByMonth: Data[]) => {
    const result = dataByMonth.reduce<Invoice[]>((acc, expense) => {
      const cardName = expense.card;
      const value = parseCurrencyString(expense.value);

      const existingCard = acc.find(item => item.card === cardName);

      if (existingCard) {
        existingCard.value += value;
      } else {
        acc.push({ card: cardName, value });
      }

      return acc;
    }, []);

    return result;
  };

  const getCardsFilteredMonth = useCallback((cardList: string[]) => {
    const newList = cardList.map((item) => cards.find((card) => card.name === item)); 
    const filteredList = newList.filter((card): card is CardData => card !== undefined);
    return filteredList;
  }, [cards]);

  const addInvoice = useCallback((cardList: CardData[], total: Invoice[]) => {
    const newCardList = cardList.map((card) => {
      const invoiceCard = total.find((invoice) => invoice.card === card.name)
      return {...card, invoice: invoiceCard?.value || 0}
    })
    return newCardList;
  }, []);

  useEffect(() => {
    const uniqueCards = filterByUniqueCards(data);
    const cardList = getCardsFilteredMonth(uniqueCards);
    const total = totalInvoice(data);
    const newList = addInvoice(cardList, total)
    setCardList(newList);
  }, [data, addInvoice, getCardsFilteredMonth]);

  return (
    <div className={`content_card ${styles.card}`}>
      <h1 className='content_card__title'>cartões</h1>

      <div className={`${styles.container}`}>
        {!data.length && !cardList.length ? (
          <div className='empty'>
            <p>nenhum cartão com gasto cadastrado</p>
          </div>
        ) : (
          <>
            {cardList.map((card) => (
              <Link 
                href={`/invoice/${username}/${date}/${card.name}/${card.color.replace("#", "")}`} 
                className={`${styles.item}`} 
                prefetch={true} 
                key={card.name}
              >
                <CardItem name={card.name} color={card.color} value={formatToCurrencyBRL(card.invoice)} />
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}