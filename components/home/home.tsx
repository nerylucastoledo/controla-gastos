"use client"

import React from 'react'

import { Filter } from './filter/filter';

import { BudgetSummary } from './budget-summary/budgetSummary';
import CreditCard from './credit-card/creditCard';
import RecentTransaction from './recent-transactions/recentTransaction';
import PersonExpense from './person-expense/personExpense';
import ExpenseByMonth from './chart/expenseByMonth';
import ExpenseByCategory from './chart/expenseByCategory';

import { useDate } from '@/context/date-context';
import bill from '@/actions/bill';
import ErrorScreen from '../../components/error/error';
import SkeletonHomePage from '@/app/(private)/loading';
import useSWR from 'swr';

export default function HomePage() {
  const { date } = useDate();
  const { data, error, isLoading } = useSWR(`${date.month}${date.year}`, bill);

  if (isLoading) return <SkeletonHomePage />;
  if (error || !data || !data.expenses) return <ErrorScreen />;

  return (
    <>
      <Filter />

      <BudgetSummary data={data.expenses} />
      <RecentTransaction data={data.expenses} />
      <CreditCard data={data} date={date} />
      <PersonExpense data={data.expenses} />
      <section className='charts'>
        <ExpenseByCategory data={data.expenses} />
        <ExpenseByMonth />
      </section>
    </>
  )
}
