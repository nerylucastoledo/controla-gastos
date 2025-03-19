import React, { Dispatch, SetStateAction } from 'react'

import styles from "../../styles/components/toast.module.scss"

interface IProps {
	message: string | undefined;
	success: boolean | undefined;
	show: boolean;
	setShowToast: Dispatch<SetStateAction<{ success: boolean; message: string; } | null>>
}

const Component = ({ message, success, show, setShowToast }: IProps) => {
	if (!show) return null;
	setTimeout(() => setShowToast(null), 2000);

  return (
		<>
			{show && (
				<div className={`${styles.toast} ${success ? styles.toast_success : styles.toast_error }`}>
					<p>{message}</p>
				</div>
			)}
		</>
  )
}

export const Toast = React.memo(Component);