import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Controla gastos | Adicionar cartão ou pessoa",
  description: "Inclua um novo cartão ou uma pessoa no Controla Gastos e obtenha uma visão clara de suas despesas. Com essas informações, você pode entender melhor para onde seu dinheiro está indo e gerenciar suas finanças de forma mais eficaz."
}

export default function LayoutNewOption({ children }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {
  return (
    <>
      { children }
    </>
  );
}
