import { ThirdwebProvider } from 'thirdweb/react';
import { ThemeProvider } from '../context/ThemeContext';
import './globals.css';
import ClientSessionProvider from '../components/ClientSessionProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider clientId="2cf5249916e742aa5f8bf079e3933bd9">
          <ClientSessionProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ClientSessionProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}