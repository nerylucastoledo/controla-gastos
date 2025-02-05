import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Controla gastos | Acessar",
  description: "Acesse o Controla gastos para conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele."
}

export default function LoginLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      {children}
    </>
  );
}
