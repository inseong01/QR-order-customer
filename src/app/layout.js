import "./globals.css";
import QueryProvider from "./QueryProvider";
import StoreProvider from "./StoreProvider";

import { Inter } from 'next/font/google'

export const metadata = {
  title: "QR order client",
  description: "Generated by create next app",
};

const inter = Inter({
  subsets: ['latin']
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
