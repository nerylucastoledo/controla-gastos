import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Controla gastos | Criar conta",
  description: "Crie uma conta no Controla gastos para conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele."
}

export default function RegisterLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      {children}
    </>
  );
}
