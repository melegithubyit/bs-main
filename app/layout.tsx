import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout-comp/navbar"
import Footer from "@/components/layout-comp/footer"
import { Toaster } from "@/components/ui/toaster"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sigma Funding Solutions",
  description: "Find the top funding solutions available for individuals, family or business.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
          <main>{children}</main>
        <Footer />
      </body>
      <Toaster/>
    </html>
  )
}
