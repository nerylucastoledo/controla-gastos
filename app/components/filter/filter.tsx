import React, { Dispatch, SetStateAction } from 'react';

import { Select } from '../select/select';

import { months, years } from "../../utils/index"

interface IProps {
  currentMonth: string,
  currentYear: string
  setMonth: Dispatch<SetStateAction<string>>;
  setYear: Dispatch<SetStateAction<string>>;
}

export default function Filter({ currentMonth, currentYear, setMonth, setYear }: IProps) {
  return (
    <div className="content_card">
      <h1 className='content_card__title'>filtro</h1>

      <Select 
        label={"mês"} 
        id={"month"}
        data-testid="month-select" 
        defaultValue={currentMonth} 
        onChange={({ target }) => setMonth(target.value)}
      >
        {months.map((month) => (
          <option key={month} value={month}>
            {month === "Marco" ? "Março" : month}
          </option>
        ))}
      </Select>

      <Select 
        label={"ano"} 
        id={"year"}
        data-testid="year-select" 
        defaultValue={currentYear}
        onChange={({ target }) => setYear(target.value)}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Select>
    </div>
  );
}