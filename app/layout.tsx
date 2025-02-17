import './styles/globals.scss';

import { Montserrat } from 'next/font/google'
import { Navigation } from './components/navigation/navigation';
import { Providers } from './providers';

import { IoHomeSharp } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { PiSealBold } from "react-icons/pi";

import { Metadata } from 'next';
 
const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Controla gastos | Página inicial",
  description: "Na página inicial do Controla gastos você irá conseguir entender para onde o seu dinheiro esta indo e ter maior controle sobre ele.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const links = [
    {
      href:"/",
      icon: <IoHomeSharp size={20} />,
      name_mobile: "Ínicio",
      name_desktop: "Ínicio",
    },
    {
      href:"/new-expense",
      icon: <IoIosAddCircle size={20} />,
      name_mobile: "Gasto",
      name_desktop: "Novo gasto",
    },
    {
      href:"/new-option",
      icon: <IoIosAddCircle size={20} />,
      name_mobile: "Opção",
      name_desktop: "Novo opção",
    },
    {
      href:"/config",
      icon: <PiSealBold size={20} />,
      name_mobile: "Perfil",
      name_desktop: "Perfil",
    },
    {
      href:"#",
      icon: <MdOutlineLogout size={24} />,
      name_mobile: "",
    },
  ]

  return (
    <html lang="en">
      <body className={montserrat.className}>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />

        <Navigation navLinks={links} />

        <Providers>
          { children }
        </Providers>
      </body>
    </html>
  );
}
