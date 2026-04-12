"use client"

import { motion } from "framer-motion"
import { ClipboardList, Sparkles, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const steps = [
  {
    title: "Fill in your details",
    description: "Enter your experience, education, and skills. Our simple interface makes it easy.",
    icon: ClipboardList,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    title: "Let AI enhance your content",
    description: "Use our AI assistant to write compelling summaries and bullet points that stand out.",
    icon: Sparkles,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    title: "Download your PDF",
    description: "Get your professional PDF instantly. Ready to send to recruiters worldwide.",
    icon: Download,
    color: "bg-green-500/10 text-green-500",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Create your professional CV in just three simple steps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-y-1/2 z-0" />
          
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative z-10"
            >
              <Card className="border-none shadow-none bg-transparent">
                <CardContent className="pt-6 text-center">
                  <div className="relative mb-6 mx-auto w-20 h-20 flex items-center justify-center rounded-2xl bg-background shadow-lg border border-zinc-100 dark:border-zinc-800">
                    <Badge variant="secondary" className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center p-0 text-sm font-bold bg-primary text-primary-foreground border-none">
                      {index + 1}
                    </Badge>
                    <step.icon className={`h-10 w-10 ${step.color.split(" ")[1]}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
