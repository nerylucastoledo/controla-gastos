"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IDateContextType {
  currentDate: string;
  setCurrentDate: React.Dispatch<React.SetStateAction<string>>
}

interface IDateProviderProps {
  children: ReactNode;
}

const DateContext = createContext<IDateContextType | undefined>(undefined);

export const DateProvider: React.FC<IDateProviderProps> = ({ children }) => {
  const [currentDate, setCurrentDate] = useState<string>("");

  return (
    <DateContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
};