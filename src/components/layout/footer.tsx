import * as React from "react"
import Link from "next/link"

export function Footer() {
  const footerLinks = [
    { name: "Privacy Policy", href: "#privacy" },
    { name: "Terms of Service", href: "#terms" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <footer className="w-full py-6 border-t bg-background mt-auto">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
        <p className="mb-4 md:mb-0">
          © {new Date().getFullYear()} MonCV. All rights reserved.
        </p>
        <div className="flex items-center space-x-6">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
