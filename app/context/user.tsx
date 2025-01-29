import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

interface IUserContextType {
    username: string;
    setUsername: (username: string) => void;
    salary: string;
    setSalary: (salary: string) => void;
}

const UserContext = createContext<IUserContextType | undefined>(undefined);

interface IUserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
	const [username, setUsername] = useState<string>('');
	const [salary, setSalary] = useState<string>('');

	useEffect(() => {
			const storedUsername = localStorage.getItem("username");
			const storedSalary = localStorage.getItem("salary");
			if (storedUsername) {
					setUsername(storedUsername);
			}
			if (storedSalary) {
					setSalary(storedSalary);
			}
	}, []);

	const value = useMemo(() => ({ username, salary, setUsername, setSalary }), [username, salary]);

	return (
		<UserContext.Provider value={value}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};