"use client"

import React from 'react';

import styles from "../../styles/dashboard.module.scss"
import useSWR from 'swr';
import Loading from '../loading/loading';
import ChartExpensesMonthly from '../chart/ChartExpensesMonthly';
import ChartExpensesCategorys from '../chart/ChartExpensesCategorys';
import { Data } from '@/app/utils/types';

interface DataByYear {
  month: string;
  value: string;
}

interface Params {
  username: string;
  year: string
  dataByMonth: Data[]
}

export default function Dashboard({ dataByMonth, username, year }: Params) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<DataByYear[]>(`http://localhost:4000/api/expenses/year/${username}/${year}`, fetcher)

  const existingData = data?.length && dataByMonth?.length

  return (
    <div className={`content_card ${styles.dashboard}`}>
      <h1 className='content_card__title'>dashboard</h1>

      <div className={`${styles.dashboard_container}`}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {!existingData ? (
              <div className='empty'>
                <p>Nada para mostrar no momento :)</p>
              </div>
            ) : (
              <>
                <div className={`${styles.dashboard_container_top}`}>
                  <div className="wrapper-chart">
                    <ChartExpensesMonthly data={data} />
                  </div>
                  <div className="wrapper-chart">
                    <ChartExpensesCategorys data={dataByMonth} />
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}