'use client';

import { DateProvider } from './context/date';
import { UserProvider } from './context/user';

export function Providers({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <UserProvider>
      <DateProvider>
        {children}
      </DateProvider>
    </UserProvider>
  );
}