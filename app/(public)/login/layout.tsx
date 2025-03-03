import { Metadata } from "next";
import { UserProvider } from "../../context/user";

export const metadata: Metadata = {
  title: "Controla gastos | Acessar",
  description: "Acesse o Controla gastos para conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele."
}

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}
