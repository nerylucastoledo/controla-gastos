import React from 'react'

import styles from "../../styles/components/toast.module.scss"

interface IProps {
	message: string;
	success: boolean;
}

export const Toast = ({ message, success }: IProps) => {
  return (
		<>
			{message && (
				<div className={`${styles.toast} ${success ? styles.toast_success : styles.toast_error }`}>
					<p>{message}</p>
				</div>
			)}
		</>
  )
}
