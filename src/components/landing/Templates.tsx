"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const templates = [
  {
    id: "classic",
    name: "The Classic",
    accent: "bg-zinc-800",
    description: "Elegant and timeless design for traditional industries.",
  },
  {
    id: "modern",
    name: "Modern Pro",
    accent: "bg-blue-600",
    description: "Sleek and professional with a touch of modern color.",
  },
  {
    id: "minimal",
    name: "Minimalist",
    accent: "bg-zinc-100 dark:bg-zinc-800",
    description: "Clean, distraction-free layout focusing on metrics.",
  },
  {
    id: "creative",
    name: "Creative Edge",
    accent: "bg-purple-600",
    description: "Bold and unique for marketing and creative roles.",
  },
]

export function Templates() {
  return (
    <section id="templates" className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Professional Templates
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Pre-optimized templates designed by recruitment experts.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl hover:border-primary/50">
                <div className="aspect-[1/1.4] bg-zinc-50 dark:bg-zinc-900 p-4 relative overflow-hidden flex flex-col gap-2">
                  {/* Mock Thumbnail Content */}
                  <div className={`h-1 w-1/3 ${template.accent} rounded-full mb-2`} />
                  <div className="flex gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                    <div className="space-y-1 w-full pt-1">
                      <div className="h-2 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
                      <div className="h-1 w-1/3 bg-zinc-100 dark:bg-zinc-800 rounded" />
                    </div>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded" />
                    ))}
                  </div>
                  <div className="mt-4 space-y-1.5">
                    <div className="h-1.5 w-1/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded" />
                    <div className="h-1 w-5/6 bg-zinc-100 dark:bg-zinc-800 rounded" />
                  </div>

                  {/* Overlay Button */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button asChild size="sm">
                      <Link href={`/editor/new?template=${template.id}`}>Use This Template</Link>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {template.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
