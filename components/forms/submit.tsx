import React, { ReactNode } from 'react'

import { VscLoading } from "react-icons/vsc";
import { useFormStatus } from 'react-dom';

type SubmitProps = {
  message: string;
  children: ReactNode;
}

export default function Submit({ message, children }: SubmitProps) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? (
        <>
          {message}
          <VscLoading className="animate-spin mr-2" />
        </>
      ) : (
        children
      )}
    </button>
  )
}
