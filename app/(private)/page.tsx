import React from 'react'
import { Metadata } from 'next';

import HomePage from '@/components/home/home';

export const metadata: Metadata = {
  title: "Controla gastos | Ínicio",
  description: "Faça o login no Controla gastos para conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele."
}

export default async function Home() {
  return (
    <HomePage />
  )
}
