"use client";

import { currentDate } from "@/utils";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

type Date = {
  month: string;
  year: string;
}

type IDateContext = {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}

export const DateContext = createContext<IDateContext | null>(null);

export const useDate = () => {
  const context = useContext(DateContext);

  if (!context) {
    throw new Error("useDate must be used within a DateContextProvider");
  }
  
  return context;
}

export function DateContextProvider({ children }: { children: React.ReactNode }) {
  const { month: currentMonth, year: currentYear } = currentDate();

  const [dateState, setDateState] = useState<Date>({ month: currentMonth, year: currentYear });

  return (
    <DateContext.Provider value={{ date: dateState, setDate: setDateState }}>
      {children}
    </DateContext.Provider>
  );
};
