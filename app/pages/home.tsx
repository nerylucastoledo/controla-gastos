"use client"

import React from 'react'

import { Filter } from '../components/filter/filter';

import { BudgetSummary } from '../components/budget-summary/budgetSummary';
import CreditCard from '../components/credit-card/creditCard';
import RecentTransaction from '../components/recent-transactions/recentTransaction';
import Chart from '../components/chart/chart';
import PersonExpense from '../components/person-expense/personExpense';

export default function HomePage() {
  return (
    <>
      <Filter />
      
      <BudgetSummary />
      <CreditCard />
      <RecentTransaction />
      <PersonExpense />
      <Chart />
    </>
  )
}
