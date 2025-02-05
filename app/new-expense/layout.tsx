import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Controla gastos | Cadastrar gastos",
  description: "Na página de cadastro de gasto do Controla gastos você consegue inserir um novo gasto para alguma pessoa e cartão, inserindo o valor, item e se possui alguma parcela."
}

export default function NewexpenseLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      {children}
    </>
  );
}
