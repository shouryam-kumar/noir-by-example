import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import LayoutContent from '../components/LayoutContent.client';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Noir by Example',
  description: 'Learn Noir through interactive examples',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
} 