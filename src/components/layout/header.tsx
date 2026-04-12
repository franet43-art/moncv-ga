"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FileText, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import { ThemeToggle } from "./theme-toggle"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  const navLinks = [
    { name: "Templates", href: "#templates" },
    { name: "Pricing", href: "#pricing" },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
            MonCV
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.name}
            </Link>
          ))}
          <ThemeToggle />
          <Button asChild>
            <Link href="/editor/new">Create My CV</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              {/* Accessibility requirement: SheetTitle must be visually hidden or rendered *inside* Dialog */}
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <div className="flex flex-col space-y-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  <Button asChild className="w-full">
                    <Link href="/editor/new" onClick={() => setIsOpen(false)}>
                      Create My CV
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}
