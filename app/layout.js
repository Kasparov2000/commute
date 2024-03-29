'use client'
import { Inter } from 'next/font/google'
import {Providers} from "@/app/provider";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Commuting made Easy',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
