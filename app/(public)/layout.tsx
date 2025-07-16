import { HeaderPublic } from "@/app/components/header/header-public";

import styles from "../styles/pages/public.module.scss";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <HeaderPublic />
        
        <div className={styles.public}>
          { children }
        </div>
      </body>
    </html>
  );
}
