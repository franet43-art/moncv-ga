"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const PRICE = "$2.99"

const benefits = [
  "ALL Premium Templates",
  "AI Content Suggestions",
  "Unlimited PDF Exports",
  "No Monthly Subscription",
  "High-Resolution Print Quality",
  "ATS-Optimized Formatting",
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Transparent Pricing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Pay once, download forever. No hidden fees or subscriptions.
          </motion.p>
        </div>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary/20 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 py-1.5 px-4 bg-primary text-primary-foreground text-xs font-bold rounded-bl-lg">
                BEST VALUE
              </div>
              <CardHeader className="text-center pt-10">
                <CardTitle className="text-2xl mb-4 text-primary">Professional CV</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold">{PRICE}</span>
                  <span className="text-muted-foreground">/ one-time</span>
                </div>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <div className="space-y-4">
                  {benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="px-8 pb-10">
                <div className="w-full space-y-4 text-center">
                  <Button asChild size="lg" className="w-full h-14 text-lg font-bold">
                    <Link href="/editor/new?reset=true">Start Building Now</Link>
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    What you see is what you get — no subscriptions, no hidden fees.
                  </p>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
