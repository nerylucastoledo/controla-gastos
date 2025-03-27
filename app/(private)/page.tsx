"use client"

import { useEffect, useState } from "react";
import useSWR from "swr";

import styles from "../styles/pages/home.module.scss";

import { Card } from "../components/card/card";
import { Dashboard } from "../components/dashboard/dashboard";
import { Error } from "../components/error/Error";
import { Filter } from "../components/filter/filter";
import { LatestExpenses } from "../components/latest-expenses/latest-expenses";
import { Resume } from "../components/resume/resume";
import { Report } from "../components/report/report";

import Loading from "./loading";

import { fetcher, months } from "../utils/index";

import { useUser } from "../context/user";
import { useDate } from "../context/date";
import { useAuth } from "../context/auth";
import { ExpensesByUsernameAndDateOutput } from "../dto/expenseDTO";

export default function Home() {
  const date = new Date()
  const [month, setMonth] = useState(months[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear().toString());
  const currentDate = `${month}${year}`
  
  const { setCurrentDate } = useDate();
  const { username, salary } = useUser();
  useAuth();

  useEffect(() => {
    setCurrentDate(currentDate);
  }, [currentDate, setCurrentDate]);

  const { data, error, isLoading, mutate } = useSWR<{ data: ExpensesByUsernameAndDateOutput}>(
    username ? `${process.env.NEXT_PUBLIC_API_URL}/expenses/${username}/${currentDate}` : null, 
    fetcher,
  )

  if (isLoading) return <Loading />
  if (error) return <Error mutate={mutate} />
  if (!data) return null;

  const { cards, expenses } = data.data;

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

          <Report data={expenses} />

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