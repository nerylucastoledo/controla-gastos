"use client"

import { useState } from "react";
import useSWR from "swr";

import styles from "./styles/pages/home.module.scss";

import { Card } from "./components/card/card";
import { Dashboard } from "./components/dashboard/dashboard";
import { Filter } from "./components/filter/filter";
import { LatestExpenses } from "./components/latest-expenses/latest-expenses";
import { Resume } from "./components/resume/resume";

import { fetcher, months } from "./utils/index";
import { IExpensesByUsernameAndDate } from "./utils/types";
import { useUser } from "./context/user";
import { Report } from "./components/report/report";

export interface IData {
  data: IExpensesByUsernameAndDate
}

const date = new Date()

export default function Home() {
  const [month, setMonth] = useState(months[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear().toString());
  const { username, salary } = useUser();

  const currentDate = `${month}${year}`
  const { data, error, mutate } = useSWR<IData>(
    `http://localhost:4000/api/expenses/${username}/${currentDate}`, 
    fetcher, 
    { refreshInterval: 3000 }
  )

  if (error) {
    return (
      <div className={styles.container_home}>
        <div className={styles.container_home_error}>
          <h1>Tivemos um problema para carregar seus dados! Você pode clicar no botão abaixa e tentar novamente :)</h1>
          <button className="button" onClick={() => mutate()}>Recarregar</button>
        </div>
      </div>
    )
  }

  if (!data || !data.data) return;

  return (
    <div className="container">
      <div className={styles.container_home}>
        <section>
          <Filter
            currentMonth={month}
            currentYear={year}
            setMonth={setMonth}
            setYear={setYear}
          />
          <Resume
            data={data.data.expenses}
            salary={salary}
          />
          <LatestExpenses
            data={data.data.expenses}
          />
        </section>
        <section>
          <Card
            cards={data.data.cards}
            data={data.data.expenses}
            date={currentDate}
            username={username}
          />
          <Report data={data.data.expenses}/>
          <Dashboard
            dataByMonth={data.data.expenses}
            username={username}
            year={year}
          />
        </section>
      </div>
    </div>
  );
}