"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const templates = [
  {
    id: "classic",
    name: "Le Classique",
    accent: "bg-zinc-800",
    description: "Design élégant et intemporel pour les secteurs traditionnels.",
  },
  {
    id: "modern",
    name: "Le Moderne",
    accent: "bg-blue-600",
    description: "Épuré et professionnel avec une touche de couleur moderne.",
  },
  {
    id: "minimal",
    name: "Le Minimaliste",
    accent: "bg-zinc-100 dark:bg-zinc-800",
    description: "Mise en page propre et sans distraction centrée sur le contenu.",
  },
  {
    id: "executive",
    name: "L'Exécutif",
    accent: "bg-indigo-600",
    description: "Sobre et structuré, parfait pour les rôles de direction.",
  },
  {
    id: "creative",
    name: "Le Créatif",
    accent: "bg-purple-600",
    description: "Audacieux et unique pour les rôles marketing et créatifs.",
  },
  {
    id: "tech",
    name: "Le Tech",
    accent: "bg-emerald-600",
    description: "Thème aux accents sombres idéal pour les développeurs.",
  },
  {
    id: "elegant",
    name: "L'Élégant",
    accent: "bg-rose-600",
    description: "Typographie raffinée pour un aspect premium.",
  },
  {
    id: "compact",
    name: "Le Compact",
    accent: "bg-orange-600",
    description: "Mise en page dense maximisant le contenu par page.",
  },
]

export function Templates() {
  return (
    <section id="templates" className="py-20 bg-slate-50/50 scroll-mt-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-black mb-4 tracking-tight"
          >
            Modèles Professionnels
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Des modèles optimisés conçus par des experts en recrutement.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border border-zinc-200 dark:border-zinc-800 transition-all hover:shadow-xl hover:border-primary/50 bg-white shadow-sm rounded-2xl">
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
                    <Button asChild size="sm" className="rounded-full px-6">
                      <Link href={`/editor/new?template=${template.id}`}>Utiliser ce modèle</Link>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-bold text-xl mb-2">{template.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
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
