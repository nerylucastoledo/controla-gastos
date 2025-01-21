'use client';

import { UserProvider } from './context/user';

export function Providers({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}