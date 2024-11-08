'use client';

import type { Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/provider/theme-provider';
import { LanguageProvider } from '@/components/provider/language-provider';
import { SocketIoProvider } from '@/components/provider/socket-io-provider';
import { AuthProvider } from '@/components/provider/auth-provider';
import NextTopLoader from 'nextjs-toploader';
import Toast from '@/components/toast/toast';
import { cn } from '@/lib/utils';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased transition-colors duration-1000',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#7289da" showSpinner={false} />
          <AuthProvider>
            <SocketIoProvider>
              <LanguageProvider>{children}</LanguageProvider>
            </SocketIoProvider>
          </AuthProvider>
          <Toast />
        </ThemeProvider>
      </body>
    </html>
  );
}
