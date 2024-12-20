import './styles/globals.scss';
import { Montserrat } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  );
}
