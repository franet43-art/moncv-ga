"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with Primary Accent */}
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center px-6 py-16 rounded-[2.5rem] bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900 shadow-2xl relative">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mt-16 -mr-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mb-16 -ml-16" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Your dream job is <br className="sm:hidden" />
              <span className="text-primary">one CV away.</span>
            </h2>
            <p className="text-zinc-400 dark:text-zinc-500 text-lg mb-10 max-w-xl mx-auto">
              Join thousands of professionals who have used MonCV to land their perfect roles. Start your journey today.
            </p>
            <Button asChild size="lg" className="h-14 px-10 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              <Link href="/editor/new?reset=true">Create My CV Now — It's Free</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
