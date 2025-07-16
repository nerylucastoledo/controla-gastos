import React from 'react'

export default function ErrorMessage({ error }: { error: string }) {
  if (error === '') return null

  return (
   <p className="error">{error}</p>
  )
}
