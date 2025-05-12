'use client'

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout-comp/navbar"
import Footer from "@/components/layout-comp/footer"
import { Toaster } from "@/components/ui/toaster"
import { Provider as StoreProvider } from "react-redux"
import store from "@/redux/store";


const inter = Inter({ subsets: ["latin"] })


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider store={store}>
          <Navbar />
            <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
      <Toaster/>
    </html>
  )
}
