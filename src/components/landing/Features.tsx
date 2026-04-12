"use client"

import { motion } from "framer-motion"
import { Sparkles, Layout, Zap, Search, Download, Smartphone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "AI Writing Assistant",
    description: "Get smart suggestions for every section. Our AI helps you phrase your achievements perfectly.",
    icon: Sparkles,
  },
  {
    title: "Real-time Preview",
    description: "See exactly how your CV looks as you type. Instant feedback on layout and formatting.",
    icon: Zap,
  },
  {
    title: "ATS-Friendly",
    description: "Optimized designs that pass Applicant Tracking Systems used by major companies.",
    icon: Search,
  },
  {
    title: "Multiple Templates",
    description: "Access a variety of professional designs tailored for different industries.",
    icon: Layout,
  },
  {
    title: "Easy Export",
    description: "Download your professional CV as a perfectly formatted PDF with just one click.",
    icon: Download,
  },
  {
    title: "Mobile Friendly",
    description: "Edit your CV on the go. Our editor is fully responsive and works on any device.",
    icon: Smartphone,
  },
]

export function Features() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Everything You Need to Succeed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Powerful tools to help you create a standout application.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border border-zinc-200 dark:border-zinc-800 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
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
