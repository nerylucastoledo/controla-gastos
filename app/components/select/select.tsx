import React, { FC, SelectHTMLAttributes } from 'react'

import styles from "../../styles/components/select.module.scss"

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
	children: React.ReactNode;
	label: string;
	id: string;
}

export const Select: FC<IProps> = ({ children, label, id, ...props }: IProps) => {
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
