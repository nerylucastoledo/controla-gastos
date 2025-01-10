"use client"

import { useState } from "react";
import useSWR from "swr";

import styles from "./styles/home.module.scss"

import Filter from "./components/filter/filter";
import Resume from "./components/resume/resume";
import LatestExpenses from "./components/latest-expenses/latest-expenses";
import Card from "./components/card/card";
import Dashboard from "./components/dashboard/dashboard";

import { months } from "./utils/index"
import { Data } from "./utils/types";
import { useUser } from "./context/user";

export default function Home() {
  const date = new Date()
  const [month, setMonth] = useState(months[date.getMonth()]);
  const [year, setYear] = useState(date.getFullYear().toString());
  const { username } = useUser();
  const currentDate = `${month}${year}`

  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, isLoading } = useSWR<Data[]>(`http://localhost:4000/api/expenses/${username}/${currentDate}`, fetcher)

  return (
    <div className="container">
      <div className={styles.container_home}>
        <section>
          <Filter 
            setMonth={setMonth} 
            setYear={setYear} 
            currentMonth={month}
            currentYear={year} 
          />
          <Resume loading={isLoading} data={data ?? []} />
          <LatestExpenses loading={isLoading} data={data ?? []} />
        </section>
        <section>
          <Card loading={isLoading} data={data ?? []} />
          <Dashboard dataByMonth={data ?? []} username={username} year={year} />
        </section>
      </div>
    </div>
  );
}