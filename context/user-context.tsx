"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

type User = {
  salary: number;
  username: string;
}

type IUserContext = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  
  return context;
}

export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [userState, setUserState] = useState<User | null>(null);

  useEffect(() => {
    if (userState) {
      localStorage.setItem("user", JSON.stringify(userState));
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser) as User;
      setUserState(parsedUser);
    }
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUser: setUserState }}>
      {children}
    </UserContext.Provider>
  );
};
