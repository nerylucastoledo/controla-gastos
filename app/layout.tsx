import './styles/globals.scss';

import { Montserrat } from 'next/font/google'

import { Metadata } from 'next';
 
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Controla gastos | Página inicial",
  description: "Na página inicial do Controla gastos você irá conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        { children }
      </body>
    </html>
  );
}
