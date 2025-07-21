"use client"

import React, { useEffect, useState } from 'react'

import { Filter } from './filter/filter';

import { BudgetSummary } from './budget-summary/budgetSummary';
import CreditCard from './credit-card/creditCard';
import RecentTransaction from './recent-transactions/recentTransaction';
import PersonExpense from './person-expense/personExpense';
import ExpenseByMonth from './chart/expenseByMonth';
import ExpenseByCategory from './chart/expenseByCategory';

import { useDate } from '@/context/date-context';
import bill from '@/actions/bill';
import { Expense } from '../../dto/expenseDTO';
import ErrorScreen from '../../components/error/error';
import SkeletonHomePage from '@/app/(private)/loading';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Expense | null>(null)
  
  const { date } = useDate();

  useEffect(() => {
    const getData = async () => {
      const response = await bill(`${date.month}${date.year}`)
      setData(response);
      setLoading(false);
    };

    getData();
  }, [date]);

  if (loading) return <SkeletonHomePage />;
  if (!data || !data.expenses) return <ErrorScreen />;

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
