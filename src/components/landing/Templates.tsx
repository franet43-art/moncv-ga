"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const templates = [
  {
    id: "classic",
    name: "Le Classique",
    accent: "#27272a", // zinc-800
    description: "Sobre, structuré, intemporel. Idéal pour la Banque, le Droit et la Finance.",
    profile: { name: "Jean-Marc Mba", title: "Auditeur Financier", initials: "JM" }
  },
  {
    id: "modern",
    name: "Le Moderne",
    accent: "#2563eb", // blue-600
    description: "Audacieux et mémorable. Idéal pour la Tech, le Marketing et les startups.",
    profile: { name: "Sandrine Obame", title: "Directrice Marketing", initials: "SO" }
  },
  {
    id: "minimal",
    name: "Le Minimaliste",
    accent: "#71717a", // zinc-500
    description: "Épuré et efficace. Recommandé par l'IA pour les profils expérimentés.",
    profile: { name: "Patrick Nguema", title: "Ingénieur Réseaux", initials: "PN" }
  },
  {
    id: "executive",
    name: "L'Executif",
    accent: "#4f46e5", // indigo-600
    description: "Sobre et structuré. Parfait pour les cadres et dirigeants.",
    profile: { name: "Christine Mezui", title: "DG Adjointe", initials: "CM" }
  },
  {
    id: "creative",
    name: "Le Creatif",
    accent: "#9333ea", // purple-600
    description: "Expressif et original. Pour le design, la communication et le marketing.",
    profile: { name: "Kevin Ondo", title: "Designer UI/UX", initials: "KO" }
  },
  {
    id: "tech",
    name: "Le Tech",
    accent: "#059669", // emerald-600
    description: "Moderne et technique. Conçu pour les développeurs et ingénieurs.",
    profile: { name: "Fatima Diallo", title: "Développeuse Full Stack", initials: "FD" }
  },
  {
    id: "elegant",
    name: "L'Elegant",
    accent: "#e11d48", // rose-600
    description: "Typographie raffinée. Pour les juristes, consultants et profils premium.",
    profile: { name: "Michel Nze", title: "Avocat d'Affaires", initials: "MN" }
  },
  {
    id: "compact",
    name: "Le Compact",
    accent: "#ea580c", // orange-600
    description: "Dense et efficace. Maximise le contenu sur une seule page.",
    profile: { name: "Awa Traoré", title: "Chargée RH Senior", initials: "AT" }
  },
]

const CVThumbnail = ({ id, profile, accent }: { id: string; profile: any; accent: string }) => {
  const lines = [1, 2, 3, 4]
  
  if (id === "tech") {
    return (
      <div className="w-full h-full bg-slate-950 p-3 font-mono text-[6px] flex flex-col gap-2">
        <div className="text-emerald-500 font-bold">{`const profile = {`}</div>
        <div className="pl-2">
          <div className="text-slate-400">{`name: "${profile.name}",`}</div>
          <div className="text-slate-400">{`title: "${profile.title}"`}</div>
        </div>
        <div className="text-emerald-500 font-bold">{`};`}</div>
        <div className="mt-2 space-y-1">
          <div className="h-1 w-full bg-slate-800" />
          <div className="h-1 w-4/5 bg-slate-800" />
          <div className="h-1 w-full bg-slate-800" />
        </div>
        <div className="mt-auto flex gap-1">
          <div className="h-2 w-6 bg-emerald-900/50 rounded" />
          <div className="h-2 w-8 bg-emerald-900/50 rounded" />
        </div>
      </div>
    )
  }

  if (id === "modern") {
    return (
      <div className="w-full h-full bg-white flex">
        <div className="w-1/3 h-full bg-slate-900 p-2 flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[8px] text-white font-bold">
            {profile.initials}
          </div>
          <div className="space-y-1 w-full">
            <div className="h-0.5 w-full bg-slate-700" />
            <div className="h-0.5 w-4/5 bg-slate-700" />
          </div>
        </div>
        <div className="flex-1 p-3 flex flex-col gap-2">
          <div className="space-y-0.5">
            <div className="text-[8px] font-black text-slate-900">{profile.name}</div>
            <div className="text-[6px] font-bold text-blue-600">{profile.title}</div>
          </div>
          <div className="space-y-1.5 mt-2">
            {lines.map(i => (
              <div key={i} className="h-1 w-full bg-slate-100" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (id === "executive") {
    return (
      <div className="w-full h-full bg-white flex flex-col">
        <div className="h-2 w-full" style={{ backgroundColor: accent }} />
        <div className="p-3 border-b border-slate-100">
          <div className="text-[10px] font-serif font-bold text-slate-900">{profile.name}</div>
          <div className="text-[6px] uppercase tracking-widest text-indigo-600 font-bold">{profile.title}</div>
        </div>
        <div className="p-3 flex gap-3">
          <div className="flex-1 space-y-2">
            <div className="h-1 w-full bg-slate-200" />
            <div className="space-y-1">
              <div className="h-0.5 w-full bg-slate-100" />
              <div className="h-0.5 w-full bg-slate-100" />
              <div className="h-0.5 w-3/4 bg-slate-100" />
            </div>
          </div>
          <div className="w-1/4 space-y-2">
            <div className="h-1 w-full bg-slate-100" />
            <div className="h-0.5 w-full bg-slate-50" />
          </div>
        </div>
      </div>
    )
  }

  if (id === "creative") {
    return (
      <div className="w-full h-full bg-white flex flex-col overflow-hidden">
        <div className="p-4 bg-purple-50">
          <div className="text-[12px] font-black text-slate-900 leading-tight">{profile.name}</div>
          <div className="text-[7px] font-bold text-purple-600 italic mt-1">{profile.title}</div>
        </div>
        <div className="p-3 flex gap-4">
          <div className="flex-1 space-y-3">
            <div className="h-1.5 w-1/2 bg-purple-100" />
            <div className="space-y-1">
              <div className="h-1 w-full bg-slate-100 rounded-full" />
              <div className="h-1 w-full bg-slate-100 rounded-full" />
            </div>
          </div>
          <div className="w-1/3 space-y-2">
            <div className="h-8 w-full bg-purple-600 rounded-sm" />
          </div>
        </div>
      </div>
    )
  }

  if (id === "elegant") {
    return (
      <div className="w-full h-full bg-white p-4 flex flex-col items-center border-[6px] border-rose-50">
        <div className="w-8 h-px bg-rose-200 mb-2" />
        <div className="text-[10px] font-serif italic text-slate-900">{profile.name}</div>
        <div className="text-[5px] uppercase tracking-[0.2em] text-rose-600 mt-1">{profile.title}</div>
        <div className="w-full h-px bg-rose-50 my-3" />
        <div className="w-full space-y-2">
          <div className="h-1 w-1/3 mx-auto bg-slate-200" />
          <div className="space-y-1">
            <div className="h-0.5 w-full bg-slate-50" />
            <div className="h-0.5 w-full bg-slate-50" />
          </div>
        </div>
      </div>
    )
  }

  if (id === "compact") {
    return (
      <div className="w-full h-full bg-white p-2">
        <div className="border-b border-orange-500 pb-1 flex justify-between items-end">
          <div className="text-[9px] font-black text-slate-900">{profile.name}</div>
          <div className="text-[5px] font-bold text-orange-600">{profile.title}</div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="space-y-2">
            <div className="h-1 w-full bg-slate-100" />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-slate-50" />
              <div className="h-0.5 w-full bg-slate-50" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-1 w-full bg-slate-100" />
            <div className="space-y-0.5">
              <div className="h-0.5 w-full bg-slate-50" />
              <div className="h-0.5 w-full bg-slate-50" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (id === "minimal") {
    return (
      <div className="w-full h-full bg-white p-4 flex flex-col gap-4">
        <div className="space-y-1">
          <div className="text-[12px] font-light text-slate-900">{profile.name}</div>
          <div className="text-[6px] tracking-widest uppercase text-slate-400">{profile.title}</div>
        </div>
        <div className="space-y-3">
          <div className="h-1 w-1/4 bg-slate-200" />
          <div className="space-y-1.5">
            <div className="h-0.5 w-full bg-slate-100" />
            <div className="h-0.5 w-full bg-slate-100" />
            <div className="h-0.5 w-3/4 bg-slate-100" />
          </div>
        </div>
      </div>
    )
  }

  // Default: Classic
  return (
    <div className="w-full h-full bg-white p-3 flex flex-col gap-3">
      <div className="border-b border-slate-900 pb-2 text-center">
        <div className="text-[10px] font-bold uppercase tracking-tighter text-slate-900">{profile.name}</div>
        <div className="text-[6px] text-slate-500 mt-0.5">{profile.title}</div>
      </div>
      <div className="space-y-2">
        <div className="h-1 w-1/3 bg-slate-300" />
        <div className="space-y-1">
          <div className="h-0.5 w-full bg-slate-100" />
          <div className="h-0.5 w-full bg-slate-100" />
          <div className="h-0.5 w-full bg-slate-100" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-1 w-1/3 bg-slate-300" />
        <div className="space-y-1">
          <div className="h-0.5 w-full bg-slate-100" />
          <div className="h-0.5 w-full bg-slate-100" />
        </div>
      </div>
    </div>
  )
}

export function Templates() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % templates.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length)
  }

  return (
    <section id="templates" className="py-24 bg-slate-50/50 scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Nos modèles de CV
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Conçus avec des recruteurs africains pour un impact immédiat.
          </motion.p>
        </div>

        <div className="relative max-w-7xl mx-auto px-12">
          {/* Nav Buttons */}
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all active:scale-95"
          >
            <ChevronRight size={24} />
          </button>

          <div className="overflow-hidden py-4">
            <motion.div 
              className="flex gap-8"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  className="shrink-0 transition-opacity duration-300"
                  style={{ width: `calc(${100 / visibleCount}% - ${(8 * (visibleCount - 1)) / visibleCount}px)` }}
                >
                  <Card className="group overflow-hidden border border-slate-200 transition-all hover:shadow-2xl hover:shadow-indigo-100/50 hover:border-indigo-200 bg-white rounded-[2rem]">
                    <div className="aspect-[1/1.4] bg-slate-50 p-6 relative overflow-hidden flex flex-col gap-2 group-hover:bg-slate-100 transition-colors">
                      <div className="w-full h-full shadow-sm rounded-lg overflow-hidden bg-white border border-slate-100">
                        <CVThumbnail id={template.id} profile={template.profile} accent={template.accent} />
                      </div>

                      {/* Overlay Button */}
                      <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                        <Button asChild className="rounded-2xl px-8 py-6 bg-white text-slate-900 hover:bg-slate-50 font-black text-lg shadow-xl shadow-black/20 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <Link href={`/editor/new?template=${template.id}`}>Utiliser ce modèle</Link>
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-8">
                      <h3 className="font-black text-2xl mb-3 text-slate-900">{template.name}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {template.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
