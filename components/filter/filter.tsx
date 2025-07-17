"use client";

import React from 'react'

import { Select } from '../forms/select'

import styles from "../../styles/components/filter/filter.module.scss";

import { months, years } from '@/utils';
import { useDate } from '@/context/date-context';

export const Filter = () => {
  const { date, setDate } = useDate();

  const handleChangeMonth = (value: string) => {
    setDate((prev) => ({ ...prev, month: value }));
  }

  const handleChangeYear = (value: string) => {
    setDate((prev) => ({ ...prev, year: value }));
  }

  return (
    <div className={styles.filter}>
      <Select
        id="month"
        label="Mês"
        options={months}
        defaultValue={date?.month}
        handleChange={handleChangeMonth}
      />

      <Select
        id="year"
        label="Ano"
        options={years}
        defaultValue={date?.year}
        handleChange={handleChangeYear} 
      />
    </div>
  )
}
