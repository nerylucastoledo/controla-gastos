import React, { ReactNode } from 'react'

import { VscLoading } from "react-icons/vsc";
import { useFormStatus } from 'react-dom';

import styles from "../../styles/components/forms/submit.module.scss";

type SubmitProps = {
  children: ReactNode;
}

export const Submit = ({ children }: SubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={styles.button}>
      {pending ? (
        <>
          Acessando...
          <VscLoading className="animate-spin mr-2" />
        </>
      ) : (
        children
      )}
    </button>
  )
}
