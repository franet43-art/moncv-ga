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
    profile: { name: "Jean-Marc Mba", title: "Auditeur Financier", initials: "JM", color: "linear-gradient(135deg, #c8a882, #8b6b4a)" }
  },
  {
    id: "modern",
    name: "Le Moderne",
    accent: "#2563eb",
    description: "Audacieux et mémorable. Idéal pour la Tech, le Marketing et les startups.",
    profile: { name: "Sandrine Obame", title: "Directrice Marketing", initials: "SO", color: "#2563eb" }
  },
  {
    id: "minimal",
    name: "Le Minimaliste",
    accent: "#71717a",
    description: "Épuré et efficace. Recommandé par l'IA pour les profils expérimentés.",
    profile: { name: "Patrick Nguema", title: "Ingénieur Réseaux", initials: "PN", color: "#71717a" }
  },
  {
    id: "executive",
    name: "L'Executif",
    accent: "#1e1b4b",
    description: "Sobre et structuré. Parfait pour les cadres et dirigeants.",
    profile: { name: "Christine Mezui", title: "DG Adjointe", initials: "CM", color: "#1e1b4b" }
  },
  {
    id: "creative",
    name: "Le Creatif",
    accent: "#9333ea",
    description: "Expressif et original. Pour le design, la communication et le marketing.",
    profile: { name: "Kevin Ondo", title: "Designer UI/UX", initials: "KO", color: "#9333ea" }
  },
  {
    id: "tech",
    name: "Le Tech",
    accent: "#059669",
    description: "Moderne et technique. Conçu pour les développeurs et ingénieurs.",
    profile: { name: "Fatima Diallo", title: "Développeuse Full Stack", initials: "FD", color: "#059669" }
  },
  {
    id: "elegant",
    name: "L'Elegant",
    accent: "#be123c",
    description: "Typographie raffinée. Pour les juristes, consultants et profils premium.",
    profile: { name: "Michel Nze", title: "Avocat d'Affaires", initials: "MN", color: "#be123c" }
  },
  {
    id: "compact",
    name: "Le Compact",
    accent: "#ea580c",
    description: "Dense et efficace. Maximise le contenu sur une seule page.",
    profile: { name: "Awa Traoré", title: "Chargée RH Senior", initials: "AT", color: "#ea580c" }
  },
]

const CVThumbnail = ({ id, profile }: { id: string; profile: any }) => {
  // Common visual elements
  const Bullet = () => <div className="w-[2px] h-[2px] rounded-full bg-current opacity-30" />
  const Line = ({ width = "100%", opacity = "opacity-10", color = "bg-slate-900" }) => (
    <div className={`h-[1.5px] ${width} ${color} ${opacity} rounded-full`} />
  )

  return (
    <div className="w-full h-full bg-white relative overflow-hidden select-none shadow-inner border border-slate-100">
      {/* Container mis à l'échelle pour permettre une précision typographique fine */}
      <div style={{ position:'absolute', top:0, left:0, width:'250%', height:'250%', transform:'scale(0.4)', transformOrigin:'top left', padding:'2.5rem', fontFamily:'sans-serif', display:'flex', flexDirection:'column' }}>
        
        {id === "classic" && (
          <div className="flex flex-col gap-6 text-[#1a1a1a]">
            <div className="flex justify-between items-start border-b-[3px] border-[#1a1a1a] pb-6 mb-8">
              <div className="flex-1">
                <h4 className="text-4xl font-serif font-bold uppercase tracking-[4px] leading-tight mb-2">{profile.name}</h4>
                <p className="text-xl italic font-medium opacity-80 mb-5">{profile.title}</p>
                <div className="flex flex-wrap gap-4 text-xs opacity-60 font-bold uppercase tracking-widest">
                   <div className="flex items-center gap-2">Libreville</div>
                   <div className="flex items-center gap-2"><Bullet /> contact@site.ga</div>
                </div>
              </div>
              <div 
                className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-serif font-bold border-4 border-[#e8e0d8] shadow-lg shrink-0 ml-8"
                style={{ background: profile.color }}
              >
                {profile.initials}
              </div>
            </div>
            
            <div className="flex flex-col gap-10">
              <section>
                <h5 className="text-[10px] font-bold uppercase tracking-[2px] border-b border-black/5 pb-2 mb-6">Expérience Professionnelle</h5>
                <div className="pl-6 border-l-[3px] border-slate-100 space-y-8">
                   {[1, 2].map(i => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between font-bold text-2xl"><span>Role de Responsable</span> <span className="opacity-40 text-sm italic font-normal">2021 — Présent</span></div>
                        <div className="text-lg opacity-60 font-bold">Entreprise Gabonaise S.A.</div>
                        <div className="space-y-2 pt-2 opacity-30"><Line /><Line width="80%" /></div>
                     </div>
                   ))}
                </div>
              </section>
              <section>
                <h5 className="text-[10px] font-bold uppercase tracking-[2px] border-b border-black/5 pb-2 mb-4">Formation</h5>
                <div className="flex justify-between text-xl font-bold"><span>Master en Finance & Audit</span><span className="opacity-40">2018</span></div>
              </section>
            </div>
          </div>
        )}

        {id === "modern" && (
          <div className="flex">
            <div className="w-[35%] bg-slate-900 text-white p-12 flex flex-col gap-12">
               <div className="w-40 h-40 rounded-3xl bg-blue-600 flex items-center justify-center text-6xl font-black shadow-2xl rotate-3">{profile.initials}</div>
               <div className="space-y-8">
                  <div className="h-px bg-white/10 w-full" />
                  <div className="space-y-3 opacity-60 text-lg uppercase font-bold tracking-widest">
                     <div>Contact</div>
                     <div>Skills</div>
                     <div>Awards</div>
                  </div>
               </div>
            </div>
            <div className="flex-1 p-16 flex flex-col gap-12 bg-white">
               <div>
                 <h4 className="text-7xl font-black text-slate-900 leading-none tracking-tighter mb-4 uppercase">{profile.name}</h4>
                 <p className="text-3xl font-bold text-blue-600 uppercase tracking-widest">{profile.title}</p>
               </div>
               <div className="space-y-8">
                  <div className="flex items-center gap-6"><div className="h-2 w-2 rounded-full bg-blue-600" /><div className="h-0.5 flex-1 bg-slate-100" /></div>
                  <div className="space-y-4">
                     {[1,2,3].map(i => <div key={i} className="h-4 bg-slate-50 rounded-lg w-full" style={{ width: `${100 - (i*10)}%` }} />)}
                  </div>
               </div>
            </div>
          </div>
        )}

        {id === "tech" && (
          <div className="bg-slate-950 p-16 font-mono text-emerald-400 border-[12px] border-slate-900">
             <div className="flex justify-between items-start mb-20 border-b border-emerald-900/30 pb-10">
                <div>
                  <div className="text-2xl text-emerald-900 mb-4">{`// FullStack_Dev`}</div>
                  <h4 className="text-7xl font-bold text-white tracking-tighter">{profile.name}</h4>
                  <p className="text-3xl text-emerald-500/60 mt-4 underline decoration-emerald-500/20 underline-offset-8">{profile.title}</p>
                </div>
                <div className="w-24 h-24 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-center text-5xl font-bold">{profile.initials}</div>
             </div>
             <div className="space-y-12">
                <div className="text-xl font-bold text-white flex items-center gap-6"><span className="opacity-30">01.</span> EXPERIENCE.MAP()</div>
                <div className="pl-12 border-l-2 border-emerald-900/50 space-y-10">
                   {[1,2].map(i => (
                     <div key={i} className="space-y-4">
                        <div className="text-2xl text-white font-bold">{`{ company: "Wave Africa", role: "Sr_Engineer" }`}</div>
                        <div className="h-2 bg-emerald-500/10 rounded w-full" />
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}

        {id === "elegant" && (
          <div className="p-16 border-[20px] border-rose-50 flex flex-col items-center text-center font-serif bg-white">
             <div className="w-20 h-px bg-rose-200 mb-10" />
             <h4 className="text-6xl italic text-slate-900 mb-2">{profile.name}</h4>
             <p className="text-xl uppercase tracking-[0.6em] text-rose-500 font-sans font-black mb-16">{profile.title}</p>
             <div className="w-full h-px bg-rose-50 my-10" />
             <div className="grid grid-cols-2 gap-20 w-full px-10">
                <div className="space-y-6"><div className="h-3 bg-slate-50 rounded" /><div className="h-3 bg-slate-50 rounded w-3/4" /></div>
                <div className="space-y-6"><div className="h-3 bg-slate-50 rounded" /><div className="h-3 bg-slate-50 rounded w-3/4" /></div>
             </div>
             <div className="mt-auto flex gap-4">
                {[1,2,3].map(i => <div key={i} className="w-3 h-3 rounded-full bg-rose-100" />)}
             </div>
          </div>
        )}

        {id === "executive" && (
          <div className="flex flex-col font-sans">
             <div className="h-[30%] bg-indigo-900 p-16 flex justify-between items-end text-white">
                <div>
                   <h4 className="text-6xl font-serif font-black tracking-tight">{profile.name}</h4>
                   <p className="text-2xl font-bold opacity-60 uppercase tracking-[0.3em] mt-4">{profile.title}</p>
                </div>
                <div className="text-right text-lg font-bold opacity-40 uppercase tracking-widest leading-relaxed">Libreville<br/>Gabon</div>
             </div>
             <div className="flex-1 p-16 grid grid-cols-12 gap-16 bg-white">
                <div className="col-span-8 space-y-12">
                   <div className="text-xl font-black border-b-4 border-indigo-900 pb-2 uppercase tracking-widest">Parcours Directionnel</div>
                   <div className="space-y-8">
                      {[1,2].map(i => <div key={i} className="h-6 w-full bg-slate-50 rounded-xl shadow-sm" />)}
                   </div>
                </div>
                <div className="col-span-4 space-y-12">
                   <div className="text-xl font-black border-b-4 border-indigo-900 pb-2 uppercase tracking-widest">Expertise</div>
                   <div className="flex flex-col gap-4">
                      {[1,2,3,4,5].map(i => <div key={i} className="h-3 w-full bg-indigo-50 rounded" />)}
                   </div>
                </div>
             </div>
          </div>
        )}

        {id === "minimal" && (
          <div className="p-16 flex flex-col gap-12 bg-white">
            <div className="space-y-4">
              <h4 className="text-5xl font-light text-slate-900 tracking-tight">{profile.name}</h4>
              <p className="text-xl tracking-[0.3em] uppercase text-slate-400 font-medium">{profile.title}</p>
            </div>
            <div className="w-full h-px bg-slate-100" />
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="text-xs font-black uppercase tracking-widest text-slate-300">Expérience</div>
                <div className="space-y-6">
                  {[1,2].map(i => (
                    <div key={i} className="flex justify-between items-baseline border-b border-slate-50 pb-4">
                      <span className="text-xl font-medium text-slate-800">Poste Senior</span>
                      <span className="text-sm text-slate-400">202{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {id === "creative" && (
          <div className="flex flex-col bg-white">
            <div className="p-16 bg-purple-600 text-white">
              <h4 className="text-7xl font-black tracking-tighter leading-none">{profile.name}</h4>
              <p className="text-2xl font-bold opacity-80 mt-4 uppercase tracking-widest">{profile.title}</p>
            </div>
            <div className="flex-1 p-16 flex gap-16">
              <div className="flex-1 space-y-10">
                <div className="text-xl font-black text-purple-600 uppercase tracking-widest">Projets</div>
                <div className="space-y-8">
                  {[1,2].map(i => (
                    <div key={i} className="border-l-4 border-purple-100 pl-6 space-y-3">
                      <div className="h-4 w-3/4 bg-slate-100 rounded" />
                      <div className="h-3 w-full bg-slate-50 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/3 space-y-6">
                <div className="text-xl font-black text-purple-600 uppercase tracking-widest">Outils</div>
                <div className="flex flex-wrap gap-3">
                  {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100" />)}
                </div>
              </div>
            </div>
          </div>
        )}

        {id === "compact" && (
          <div className="p-10 flex flex-col gap-6 bg-white">
            <div className="flex justify-between items-center border-b-4 border-orange-500 pb-6">
              <div>
                <h4 className="text-4xl font-black text-slate-900 uppercase leading-none">{profile.name}</h4>
                <p className="text-lg font-bold text-orange-600 uppercase tracking-widest mt-2">{profile.title}</p>
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase text-right">Libreville<br/>Gabon</div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="text-xs font-black bg-slate-900 text-white px-4 py-2 uppercase">Expériences</div>
                {[1,2,3].map(i => (
                  <div key={i} className="border-l-2 border-orange-100 pl-4 space-y-2">
                    <div className="h-3 w-full bg-slate-100 rounded" />
                    <div className="h-2 w-3/4 bg-slate-50 rounded" />
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                <div className="text-xs font-black bg-slate-900 text-white px-4 py-2 uppercase">Formation</div>
                {[1,2].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-full bg-slate-100 rounded" />
                    <div className="h-2 w-1/2 bg-slate-50 rounded" />
                  </div>
                ))}
                <div className="flex flex-wrap gap-2 pt-4">
                  {[1,2,3,4,5].map(i => <div key={i} className="h-3 w-10 bg-orange-50 rounded" />)}
                </div>
              </div>
            </div>
          </div>
        )}
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
                        <CVThumbnail id={template.id} profile={template.profile} />
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
