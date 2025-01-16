import React from 'react'

import styles from "../../styles/components/toast.module.scss"

interface Params {
	success: boolean;
	message: string;
}

export default function Toast({ success, message }: Params) {

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
