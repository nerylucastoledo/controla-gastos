"use client"

import React, { useCallback, useEffect, useState } from 'react';

import styles from "../../styles/components/card.module.scss"

import { InvoiceModal } from '../Invoice/invoice-modal';

import { ICardData, IExpense } from '@/app/utils/types';
import { formatToCurrencyBRL, parseCurrencyString } from '@/app/utils';
import { CardItem } from './cardItem/cardItem';

interface IProps {
  cards: ICardData[],
  data: IExpense[],
  date: string,
  username: string,
}

interface ICardList extends ICardData { 
  invoice: number;
}

interface ICardSelected {
  color: string;
  name: string;
}

interface IInvoice {
  card: string;
  value: number;
}

export const Card = ({ cards, data, date, username }: IProps) => {
  const [cardList, setCardList] = useState<ICardList[]>([]);
  const [cardSelected, setCardSelect] = useState<ICardSelected>({ name: "", color: "" });

  const filterByUniqueCards = (dataByMonth: IExpense[]) => {
    const cardSet = new Set<string>();
    dataByMonth.forEach((item) => cardSet.add(item.card));
    return Array.from(cardSet);
  };

  const totalInvoice = (dataByMonth: IExpense[]) => {
    const result = dataByMonth.reduce<IInvoice[]>((acc, expense) => {
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
    const filteredList = newList.filter((card): card is ICardData => card !== undefined);
    return filteredList;
  }, [cards]);

  const addInvoice = useCallback((cardList: ICardData[], total: IInvoice[]) => {
    const newCardList = cardList.map((card) => {
      const invoiceCard = total.find((invoice) => invoice.card === card.name)
      return {...card, invoice: invoiceCard?.value || 0}
    })
    return newCardList;
  }, []);

  useEffect(() => {
    if (data) {
      const uniqueCards = filterByUniqueCards(data);
      const cardList = getCardsFilteredMonth(uniqueCards);
      const total = totalInvoice(data);
      const newList = addInvoice(cardList, total)
      setCardList(newList);
    }
  }, [data, addInvoice, getCardsFilteredMonth]);

  return (
    <div className={`content_card ${styles.card}`}>
      <h1 className='content_card__title'>cartões</h1>

      <div className={`${styles.container}`}>
        {!data || !data.length && !cardList.length ? (
          <div className='empty'>
            <p>nenhum cartão com gasto cadastrado</p>
          </div>
        ) : (
          <>
            {cardList.map((card) => (
              <button 
                className={`${styles.item}`} 
                key={card.name}
                onClick={() => setCardSelect({ name: card.name, color: card.color })}
              >
                <CardItem
                  color={card.color} 
                  name={card.name} 
                  value={formatToCurrencyBRL(card.invoice)} 
                />
              </button>
            ))}

            {cardSelected.name && cardSelected.color && (
              <InvoiceModal
                card={cardSelected.name}
                backgroundColor={cardSelected.color}
                date={date}
                onDismiss={() => setCardSelect({ name: "", color: "" })}
                username={username}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}