"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

const templates = [
  {
    id: "classic",
    name: "Le Classique",
    description: "Sobre, structuré, intemporel. Idéal pour la Banque, le Droit et la Finance.",
    image: "/templates/classic.png",
  },
  {
    id: "modern",
    name: "Le Moderne",
    description: "Audacieux et mémorable. Idéal pour la Tech, le Marketing et les startups.",
    image: "/templates/moderne.png",
  },
  {
    id: "minimal",
    name: "Le Minimaliste",
    description: "Épuré et efficace. Recommandé par l'IA pour les profils expérimentés.",
    image: "/templates/minimaliste.png",
  },
  {
    id: "executive",
    name: "L'Executif",
    description: "Sobre et structuré. Parfait pour les cadres et dirigeants.",
    image: "/templates/executif.png",
  },
  {
    id: "creative",
    name: "Le Creatif",
    description: "Expressif et original. Pour le design, la communication et le marketing.",
    image: "/templates/creatif.png",
  },
  {
    id: "tech",
    name: "Le Tech",
    description: "Moderne et technique. Conçu pour les développeurs et ingénieurs.",
    image: "/templates/tech.png",
  },
  {
    id: "elegant",
    name: "L'Elegant",
    description: "Typographie raffinée. Pour les juristes, consultants et profils premium.",
    image: "/templates/elegant.png",
  },
  {
    id: "compact",
    name: "Le Compact",
    description: "Dense et efficace. Maximise le contenu sur une seule page.",
    image: "/templates/compact.png",
  },
]

const AUTOPLAY_MS = 3500
const MIN_SWIPE_PX = 40

export function Templates() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(3)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1)
      else if (window.innerWidth < 1024) setVisibleCount(2)
      else setVisibleCount(3)
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  const maxIndex = templates.length - visibleCount

  const next = useCallback(() =>
    setCurrentIndex((p) => (p >= maxIndex ? 0 : p + 1)),
    [maxIndex])

  const prev = useCallback(() =>
    setCurrentIndex((p) => (p <= 0 ? maxIndex : p - 1)),
    [maxIndex])

  const goTo = useCallback((i: number) =>
    setCurrentIndex(Math.max(0, Math.min(i, maxIndex))),
    [maxIndex])

  useEffect(() => {
    if (isPaused) return
    timerRef.current = setTimeout(next, AUTOPLAY_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [currentIndex, isPaused, next])

  const pauseAndResume = () => {
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 2500)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current)
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current)
    // Si le mouvement est plus horizontal que vertical, on bloque le scroll
    if (deltaX > deltaY && deltaX > 10) {
      if (e.cancelable) e.preventDefault()
    }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) >= MIN_SWIPE_PX) {
      delta > 0 ? next() : prev()
      pauseAndResume()
    }
    touchStartX.current = null
    touchStartY.current = null
  }

  const GAP = 16
  const cardW = `calc(${100 / visibleCount}% - ${(GAP * (visibleCount - 1)) / visibleCount}px)`

  // Remplace translateX par un nombre pur en pourcentage
  const slidePercent = currentIndex * (100 / visibleCount)

  return (
    <section
      id="templates"
      className="py-10 md:py-20 bg-[#FAFAF8] scroll-mt-20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 md:px-8">

        <div className="text-center mb-8 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-6xl font-black mb-3 tracking-tighter text-slate-900 leading-none"
          >
            Nos modèles de CV
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 text-sm md:text-lg max-w-2xl mx-auto"
          >
            Conçus avec des recruteurs africains pour un impact immédiat dès la première lecture.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto px-8 md:px-10">

          <button
            onClick={() => { prev(); pauseAndResume() }}
            aria-label="Précédent"
            className="absolute left-0 top-[38%] -translate-y-1/2 z-20 w-8 h-8 md:w-11 md:h-11 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-700 hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => { next(); pauseAndResume() }}
            aria-label="Suivant"
            className="absolute right-0 top-[38%] -translate-y-1/2 z-20 w-8 h-8 md:w-11 md:h-11 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center text-slate-700 hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronRight size={18} />
          </button>

          <div
            className="overflow-hidden py-3 md:py-5"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <motion.div
              className="flex"
              style={{ gap: GAP }}
              animate={{ x: `-${slidePercent}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 32 }}
            >
              {templates.map((t) => (
                <div key={t.id} className="shrink-0" style={{ width: cardW }}>
                  <Card className="group overflow-hidden border-none bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">

                    <div className="aspect-[3/4] relative overflow-hidden bg-slate-50">
                      <img
                        src={t.image}
                        alt={`Aperçu ${t.name}`}
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-5">
                        <Link
                          href={`/editor/new?template=${t.id}`}
                          className="w-full py-2.5 md:py-3.5 rounded-xl bg-white text-slate-900 font-black text-xs md:text-sm text-center shadow-md translate-y-3 group-hover:translate-y-0 transition-transform duration-300 hover:bg-slate-50"
                        >
                          Utiliser ce modèle →
                        </Link>
                      </div>
                    </div>

                    <CardContent className="p-3 md:p-5">
                      <h3 className="font-black text-sm md:text-lg text-slate-900 mb-1 leading-tight">
                        {t.name}
                      </h3>
                      <p className="text-[11px] md:text-sm text-slate-500 leading-snug">
                        {t.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex justify-center gap-1.5 mt-3">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); pauseAndResume() }}
                aria-label={`Groupe ${i + 1}`}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-5 bg-indigo-600" : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
