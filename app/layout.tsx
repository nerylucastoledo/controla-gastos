import { Toaster } from 'react-hot-toast';
import '../styles/globals.scss';

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.className}>
      <body>
        <Toaster position="top-center" />
        { children }
      </body>
    </html>
  );
}
