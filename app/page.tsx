"use client"

import { useEffect, useState } from "react";
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
import Loading from "./loading";
import { Error } from "./components/error/Error";
import { useDate } from "./context/date";

export interface IData {
  data: IExpensesByUsernameAndDate
}

const date = new Date()

export default function Home() {
  const [month, setMonth] = useState(months[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear().toString());
  const { username, salary } = useUser();
  const { setCurrentDate } = useDate();
  const currentDate = `${month}${year}`

  const { data, error, mutate, isLoading } = useSWR<IData>(
    `${process.env.NEXT_PUBLIC_API_URL}/expenses/${username}/${currentDate}`, 
    fetcher, 
  )

  useEffect(() => {
    setCurrentDate(currentDate);
  }, [setCurrentDate, mutate, currentDate]);

  if (isLoading) return <Loading />
  if (error) return <Error mutate={mutate} />
  if (!data) return null;

  const { expenses, cards } = data.data;

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
            data={expenses}
            salary={salary}
          />
          <LatestExpenses
            data={expenses}
          />
        </section>
        <section>
          <Card
            cards={cards}
            data={expenses}
            date={currentDate}
            username={username}
          />
          <Report data={expenses}/>
          <Dashboard
            dataByMonth={expenses}
            username={username}
            year={year}
          />
        </section>
      </div>
    </div>
  );
}