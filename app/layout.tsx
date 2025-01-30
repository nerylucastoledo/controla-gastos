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
      href:"/",
      icon: <IoHomeSharp size={24} />,
      name: "Ínicio",
    },
    {
      href:"/new-expense",
      icon: <IoIosAddCircle size={24} />,
      name: "Inserir gasto",
    },
    {
      href:"/new-option",
      icon: <IoOptionsSharp size={24} />,
      name: "Cadastrar opção",
    },
    {
      href:"/config",
      icon: <PiSealBold size={24} />,
      name: "Configurações",
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
