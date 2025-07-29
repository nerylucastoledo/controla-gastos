import React from 'react'
import { Metadata } from 'next';

import HomePage from '@/components/home/home';

export const metadata: Metadata = {
  title: "Controla gastos | Ínicio",
  description: "Entre no Controla Gastos e descubra como otimizar suas finanças pessoais. Com nossa ferramenta, você poderá visualizar para onde seu dinheiro está indo e tomar decisões mais inteligentes para um melhor controle financeiro."
}

export default async function Home() {
  return (
    <HomePage />
  )
}
