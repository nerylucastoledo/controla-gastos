import React, { Dispatch, SetStateAction } from 'react';

import { months, years } from "../../utils/index"
import styles from "../../styles/filter.module.scss"

interface Params {
  setMonth: Dispatch<SetStateAction<string>>;
  setYear: Dispatch<SetStateAction<string>>;
  currentMonth: string,
  currentYear: string
}

export default function Filter({ setMonth, setYear, currentMonth, currentYear }: Params) {
  return (
    <div className="content_card">
      <h1 className='content_card__title'>filtro</h1>
      <div className={styles.filter_content}>
        <p>mês</p>
        <select 
          name="month" 
          id="month" 
          data-testid="month-select" 
          defaultValue={currentMonth} 
          onChange={({ target }) => setMonth(target.value)}
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month === "Marco" ? "Março" : month}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filter_content}>
        <p>ano</p>
        <select 
          name="year" 
          id="year" 
          defaultValue={currentYear}
          data-testid="year-select" 
          onChange={({ target }) => setYear(target.value)}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}