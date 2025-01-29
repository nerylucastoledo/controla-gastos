import React from 'react'

import styles from "../../styles/components/toast.module.scss"

interface IProps {
	success: boolean;
	message: string;
}

export default function Toast({ success, message }: IProps) {

	if (!message) return;
	
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
