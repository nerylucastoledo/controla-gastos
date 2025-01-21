import './styles/globals.scss';

import { Montserrat } from 'next/font/google'
import { Navigation } from './components/navigation/navigation';
import { Providers } from './providers';
 
const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children, modal }: { children: React.ReactNode, modal: React.ReactNode }) {
  const links = [
    {
      name: "Ínicio",
      href:"/"
    },
    {
      name: "Inserir gasto",
      href:"/new-expense"
    },
    {
      name: "Cadastrar opção",
      href:"/new-option"
    },
    {
      name: "Configurações",
      href:"/config"
    },
  ]

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navigation navLinks={links} />

        <Providers>
          { children }
          { modal }
        </Providers>
      </body>
    </html>
  );
}
