import { HeaderPrivate } from "../../components/header/header-private";

import { DateContextProvider } from "@/context/date-context";

import styles from "../../styles/pages/private.module.scss";

import { Toaster } from "react-hot-toast";

export default function PrivateLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {
  return (
    <>
      <Toaster position="top-center" />

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
    </>
  );
}
