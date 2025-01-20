import React from 'react'

import styles from "../../styles/components/select.module.scss"

interface Props {
	children: React.ReactNode;
	label: string;
	id: string;
	defaultValue?: string;
	onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const Select = ({ children, label, id, ...props }: Props) => {
  return (
    <div className={styles.select_container}>
			<label htmlFor={id}>{label}</label>
			<select 
				name={id} 
				id={id}
				{...props}
			>
				{children}
			</select>
		</div>
  )
}
