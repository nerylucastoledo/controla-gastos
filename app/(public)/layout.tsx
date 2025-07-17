import { HeaderPublic } from "@/components/header/header-public";

import styles from "../../styles/pages/public.module.scss";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <HeaderPublic />
        
        <main className={styles.public}>
          { children }
        </main>
      </body>
    </html>
  );
}
