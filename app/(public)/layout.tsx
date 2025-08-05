import { HeaderPublic } from "@/components/header/header-public";

import styles from "../../styles/pages/public.module.scss";
import { Toaster } from "react-hot-toast";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <>
      <Toaster position="top-center" />

      <HeaderPublic />

      <main className={styles.public}>
      { children }
      </main>
    </>
  );
}
