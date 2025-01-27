import './styles/globals.scss';

import { Montserrat } from 'next/font/google'
import { Navigation } from './components/navigation/navigation';
import { Providers } from './providers';

import { IoHomeSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { IoOptionsSharp } from "react-icons/io5";
import { PiSealBold } from "react-icons/pi";
 
const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const links = [
    {
      name: "Ínicio",
      href:"/",
      icon: <IoHomeSharp size={24} />,
    },
    {
      name: "Inserir gasto",
      href:"/new-expense",
      icon: <IoIosAddCircle size={24} />
    },
    {
      name: "Cadastrar opção",
      href:"/new-option",
      icon: <IoOptionsSharp size={24} />
    },
    {
      name: "Configurações",
      href:"/config",
      icon: <PiSealBold size={24} />
    },
  ]

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Navigation navLinks={links} />

        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  );
}
