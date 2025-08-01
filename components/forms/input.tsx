import React from 'react'

import styles from "../../styles/components/forms/input.module.scss"

type InputProps = React.ComponentProps<"input"> & {
  label: string;
  id: string;
}

export default function Input({ label, id, ...props}: InputProps) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} />
    </div>
  )
}
