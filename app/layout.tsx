import { ThemeProvider } from '../context/ThemeContext';
import './globals.css';
import ClientSessionProvider from '../components/ClientSessionProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}