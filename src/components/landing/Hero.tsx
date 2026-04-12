"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side: Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
            >
              Build a Professional CV <br className="hidden md:block" />
              That <span className="text-primary">Gets You Hired</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0"
            >
              Our AI-powered builder helps you create a stunning CV in minutes.
              No design skills needed. Optimized for global job markets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              <Button size="lg" className="h-14 px-8 text-lg font-semibold" asChild>
                <Link href="/editor/new">Create My CV — It's Free</Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold" asChild>
                <Link href="#templates">See Templates</Link>
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0"
            >
              {[
                "AI-Powered Writing",
                "Professional Templates",
                "PDF Export",
                "Free to Start",
              ].map((badge) => (
                <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side: Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 relative w-full max-w-[500px] lg:max-w-none px-4 md:px-0"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative bg-white dark:bg-zinc-900 rounded-lg shadow-2xl border aspect-[1/1.414] p-8 overflow-hidden"
            >
              {/* Fake Content Decoration */}
              <div className="space-y-6">
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                  <div className="space-y-2 w-full">
                    <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-3 w-1/3 bg-zinc-100 dark:bg-zinc-800 rounded" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="h-3 w-1/4 bg-primary/20 rounded" />
                  <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-800 rounded" />
                  <div className="h-2 w-5/6 bg-zinc-100 dark:bg-zinc-800 rounded" />
                  <div className="h-2 w-4/6 bg-zinc-100 dark:bg-zinc-800 rounded" />
                </div>

                <div className="space-y-3 pt-4">
                  <div className="h-3 w-1/4 bg-primary/20 rounded" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4">
                        <div className="w-1 bg-primary/30 rounded" />
                        <div className="space-y-2 w-full">
                          <div className="h-3 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
                          <div className="h-2 w-2/3 bg-zinc-100 dark:bg-zinc-800 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative side element */}
              <div className="absolute top-0 right-0 w-24 h-full bg-primary/5 -mr-12 skew-x-12" />
            </motion.div>
            
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
