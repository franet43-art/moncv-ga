"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const templates = [
  {
    id: "classic",
    name: "Le Classique",
    accent: "#c8a882",
    description: "Sobre, structuré, intemporel. Idéal pour la Banque, le Droit et la Finance.",
    profile: { name: "Jean-Marc Mba", title: "Auditeur Financier", initials: "JM", color: "linear-gradient(135deg, #c8a882, #8b6b4a)" },
    image: "/templates/classic.png"
  },
  {
    id: "modern",
    name: "Le Moderne",
    accent: "#2563eb",
    description: "Audacieux et mémorable. Idéal pour la Tech, le Marketing et les startups.",
    profile: { name: "Sandrine Obame", title: "Directrice Marketing", initials: "SO", color: "#2563eb" },
    image: "/templates/moderne.png"
  },
  {
    id: "minimal",
    name: "Le Minimaliste",
    accent: "#71717a",
    description: "Épuré et efficace. Recommandé par l'IA pour les profils expérimentés.",
    profile: { name: "Patrick Nguema", title: "Ingénieur Réseaux", initials: "PN", color: "#71717a" },
    image: "/templates/minimaliste.png"
  },
  {
    id: "executive",
    name: "L'Executif",
    accent: "#1e1b4b",
    description: "Sobre et structuré. Parfait pour les cadres et dirigeants.",
    profile: { name: "Christine Mezui", title: "DG Adjointe", initials: "CM", color: "#1e1b4b" },
    image: "/templates/executif.png"
  },
  {
    id: "creative",
    name: "Le Creatif",
    accent: "#9333ea",
    description: "Expressif et original. Pour le design, la communication et le marketing.",
    profile: { name: "Kevin Ondo", title: "Designer UI/UX", initials: "KO", color: "#9333ea" },
    image: "/templates/creatif.png"
  },
  {
    id: "tech",
    name: "Le Tech",
    accent: "#059669",
    description: "Moderne et technique. Conçu pour les développeurs et ingénieurs.",
    profile: { name: "Fatima Diallo", title: "Développeuse Full Stack", initials: "FD", color: "#059669" },
    image: "/templates/tech.png"
  },
  {
    id: "elegant",
    name: "L'Elegant",
    accent: "#be123c",
    description: "Typographie raffinée. Pour les juristes, consultants et profils premium.",
    profile: { name: "Michel Nze", title: "Avocat d'Affaires", initials: "MN", color: "#be123c" },
    image: "/templates/elegant.png"
  },
  {
    id: "compact",
    name: "Le Compact",
    accent: "#ea580c",
    description: "Dense et efficace. Maximise le contenu sur une seule page.",
    profile: { name: "Awa Traoré", title: "Chargée RH Senior", initials: "AT", color: "#ea580c" },
    image: "/templates/compact.png"
  },
]

const CVThumbnail = ({ image, name }: { image: string; name: string }) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-white">
      <img
        src={image}
        alt={`Aperçu du template ${name}`}
        className="w-full h-full object-cover object-top"
        style={{ display: 'block' }}
      />
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
    <section id="templates" className="py-24 bg-[#FAFAF8] scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-7xl font-black mb-8 tracking-tighter text-slate-900 leading-none"
          >
            Nos modèles de CV
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 text-xl md:text-2xl max-w-3xl mx-auto font-medium"
          >
            Conçus avec des recruteurs africains pour un impact immédiat dès la première lecture.
          </motion.p>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-12">
          {/* Nav Buttons */}
          <div className="absolute top-1/2 -left-4 -right-4 -translate-y-1/2 flex justify-between pointer-events-none z-20">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center text-slate-900 hover:scale-110 active:scale-95 transition-all pointer-events-auto"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-full bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center text-slate-900 hover:scale-110 active:scale-95 transition-all pointer-events-auto"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          <div className="overflow-hidden py-10 px-2">
            <motion.div 
              className="flex gap-10"
              animate={{ x: `-${currentIndex * (100 / visibleCount)}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {templates.map((template) => (
                <div 
                  key={template.id} 
                  className="shrink-0"
                  style={{ width: `calc(${100 / visibleCount}% - ${(10 * (visibleCount - 1)) / visibleCount}px)` }}
                >
                  <Card className="group overflow-hidden border-none transition-all duration-500 hover:shadow-[0_32px_64px_-12px_rgba(79,70,229,0.15)] bg-white rounded-[3rem] shadow-xl flex flex-col h-full">
                    <div className="aspect-[1/1.35] bg-slate-50 relative overflow-hidden flex flex-col group-hover:bg-slate-100 transition-colors">
                      {/* High-Fidelity CV Rendering */}
                      <div className="w-full h-full shadow-inner transform group-hover:scale-[1.03] transition-transform duration-700">
                        <CVThumbnail image={template.image} name={template.name} />
                      </div>

                      {/* Overlay Button */}
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[3px] flex items-center justify-center p-10">
                        <Button asChild className="w-full py-8 rounded-[2rem] bg-white text-slate-900 hover:bg-white/90 font-black text-xl shadow-2xl translate-y-10 group-hover:translate-y-0 transition-all duration-500 border-none">
                          <Link href={`/editor/new?template=${template.id}`}>
                            Utiliser ce modèle
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-10 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-black text-3xl mb-4 text-slate-900 leading-tight">{template.name}</h3>
                        <p className="text-lg text-slate-500 leading-relaxed font-medium">
                          {template.description}
                        </p>
                      </div>
                      <div className="mt-8 flex items-center gap-4">
                         <div className="h-px flex-1 bg-slate-100" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Design Pro</span>
                      </div>
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
