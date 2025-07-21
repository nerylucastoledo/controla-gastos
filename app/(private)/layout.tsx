import { Metadata } from "next";

import { HeaderPrivate } from "../../components/header/header-private";

import { DateContextProvider } from "@/context/date-context";

import styles from "../../styles/pages/private.module.scss";

export const metadata: Metadata = {
  title: "Controla gastos | Acessar",
  description: "Acesse o Controla gastos para conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele."
}

export default function PrivateLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <DateContextProvider>
          <>
            <HeaderPrivate />

            <main className={styles.private}>
              { children }
            </main>
            <div>
              { modal }
            </div>
          </>
        </DateContextProvider>
      </body>
    </html>
  );
}
