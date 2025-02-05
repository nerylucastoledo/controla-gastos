import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Controla gastos | Cadastrar opção",
  description: "Na página de cadastro de opção do Controla gastos você consegue inserir uma nova pessoa ou cartão para separar os gastos."
}

export default function NewexpenseLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      {children}
    </>
  );
}
