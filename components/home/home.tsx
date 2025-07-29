"use client"

import React from 'react'
import useSWR from 'swr';

import Filter from './filter/filter';
import BudgetSummary from './budget-summary/budgetSummary';
import RecentTransaction from './recent-transactions/recentTransaction';
import Cards from './credit-card/cards';
import PersonExpense from './person-expense/personExpense';
import ExpenseByMonth from './chart/expenseByMonth';
import ExpenseByCategory from './chart/expenseByCategory';
import ErrorScreen from '../../components/error/error';

import SkeletonHomePage from '@/app/(private)/(home)/loading';

import { useDate } from '@/context/date-context';
import { billGet } from '@/actions/bill';
import { BillDTOOutput } from '@/dto/billDTO';
import { CardDTOOutput } from '@/dto/cardDTO';

type DataDTO = {
  expenses: BillDTOOutput[];
  cards: CardDTOOutput[];
}

export default function HomePage() {
  const { date } = useDate();
  const { data, error, isLoading } = useSWR<DataDTO>(`expenses/${date.month}${date.year}`, billGet);

  if (isLoading) return <SkeletonHomePage />;
  if (error || !data) return <ErrorScreen />;

  return (
    <>
      <Filter />

      <BudgetSummary data={data.expenses} />
      <RecentTransaction data={data.expenses} />
      <Cards data={data} date={date} />
      <PersonExpense data={data.expenses} />

      <section className='charts'>
        <ExpenseByCategory data={data.expenses} />
        <ExpenseByMonth />
      </section>
    </>
  )
}
