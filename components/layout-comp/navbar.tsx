"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import logo from "@/public/logo/logo.svg"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Sigma Logo"
            width={80}
            height={80}
            className="transition-transform duration-300 hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/startup" className="text-sm font-medium hover:text-primary transition-colors">
            Start Up
          </Link>
          <Link href="/hiwot" className="text-sm font-medium hover:text-primary transition-colors">
            Hiwot Fund
          </Link>
          <Link href="/job" className="text-sm font-medium hover:text-primary transition-colors">
            Job Applicant
          </Link>
          <Link href="/feedback" className="text-sm font-medium hover:text-primary transition-colors">
            Feedback
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About us
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Amharic</DropdownMenuItem>
              <DropdownMenuItem>French</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild className="bg-orange-50 text-black hover:bg-orange-100">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/startup"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Up
            </Link>
            <Link
              href="/hiwot"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Hiwot Fund
            </Link>
            <Link
              href="/job"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Job Applicant
            </Link>
            <Link
              href="/feedback"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Feedback
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About us
            </Link>
            <div className="pt-2 border-t">
              <Button asChild className="w-full bg-orange-50 text-black hover:bg-orange-100">
                <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
                  Contact Us
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
