import { Toaster } from 'react-hot-toast';
import '../styles/globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        { children }
      </body>
    </html>
  );
}
