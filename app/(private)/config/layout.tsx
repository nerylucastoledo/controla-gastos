import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Controla gastos | Configurações",
  description: "Na página de configurações do Controla gastos você consegue atualizar suas informações, nome das pessoas e do cartão."
}

export default function ConfigLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      {children}
    </>
  );
}
