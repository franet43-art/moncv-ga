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
  return (
    <div className="w-full h-full bg-white relative overflow-hidden select-none shadow-inner border border-slate-100">
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '250%', 
        height: '250%', 
        transform: 'scale(0.4)', 
        transformOrigin: 'top left',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {id === "classic" && (
          <div style={{ padding: '32px 36px', fontFamily: '"DM Sans", sans-serif', fontSize: '9px', color: '#1a1a1a', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '2px solid #1a1a1a', marginBottom: '16px' }}>
              <div>
                <h4 style={{ fontFamily: '"EB Garamond", serif', fontSize: '22px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '4px', lineHeight: 1 }}>Jean-Marc Mba</h4>
                <p style={{ fontSize: '10px', fontStyle: 'italic', fontWeight: 500, marginBottom: '10px', color: '#444' }}>Auditeur Financier Senior</p>
                <div style={{ display: 'flex', gap: '14px', fontSize: '8px', color: '#555' }}>
                  <span>Libreville, Gabon</span>
                  <span>contact@jmmba.ga</span>
                  <span>+241 07 00 00 00</span>
                </div>
              </div>
              <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'linear-gradient(135deg, #c8a882, #8b6b4a)', border: '2px solid #e8e0d8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px', fontWeight: 700, fontFamily: '"EB Garamond", serif' }}>
                JM
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <h5 style={{ fontSize: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid rgba(26,26,26,0.12)', paddingBottom: '4px', marginBottom: '8px' }}>Expérience Professionnelle</h5>
                <div style={{ paddingLeft: '10px', borderLeft: '2px solid #e8e8e8', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '9.5px', marginBottom: '2px' }}>
                    <span>Auditeur Senior</span>
                    <span style={{ fontSize: '7.5px', color: '#888', fontWeight: 400 }}>2021 — Présent</span>
                  </div>
                  <div style={{ fontSize: '8.5px', color: '#444', fontWeight: 500, marginBottom: '4px' }}>Deloitte Afrique Central</div>
                  <div style={{ height: '1px', width: '100%', background: '#f0f0f0', marginBottom: '4px' }} />
                  <div style={{ height: '1px', width: '80%', background: '#f0f0f0' }} />
                </div>
                <div style={{ paddingLeft: '10px', borderLeft: '2px solid #e8e8e8', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '9.5px', marginBottom: '2px' }}>
                    <span>Auditeur Junior</span>
                    <span style={{ fontSize: '7.5px', color: '#888', fontWeight: 400 }}>2018 — 2021</span>
                  </div>
                  <div style={{ fontSize: '8.5px', color: '#444', fontWeight: 500, marginBottom: '4px' }}>BGFIBank Gabon</div>
                </div>
              </div>
              <div>
                <h5 style={{ fontSize: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid rgba(26,26,26,0.12)', paddingBottom: '4px', marginBottom: '8px' }}>Formation & Compétences</h5>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 600, fontSize: '9px' }}>Master en Finance et Audit</div>
                  <div style={{ fontSize: '8px', color: '#666' }}>INSG, Libreville — 2018</div>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {['Audit Financier', 'Normes IFRS', 'Analyse Risques', 'Reporting', 'Fiscalité'].map(skill => (
                    <span key={skill} style={{ fontSize: '7.5px', padding: '2px 7px', background: '#f4f4f4', border: '1px solid #e0e0e0', borderRadius: '2px', color: '#555' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {id === "modern" && (
          <div style={{ display: 'flex', minHeight: '560px', fontFamily: 'sans-serif' }}>
            <div style={{ width: '155px', background: '#2563eb', color: 'white', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)', fontSize: '20px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>SO</div>
              <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', textAlign: 'center', letterSpacing: '1px' }}>Sandrine Obame</div>
              
              <div>
                <h5 style={{ fontSize: '7px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '8px' }}>Contact</h5>
                <div style={{ fontSize: '7px', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span>Libreville, Gabon</span>
                  <span>s.obame@email.com</span>
                  <span>+241 06 11 22 33</span>
                </div>
              </div>

              <div>
                <h5 style={{ fontSize: '7px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px', marginBottom: '8px' }}>Expertise</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {['Marketing Digital', 'Stratégie Com', 'Branding', 'Event Planning'].map(skill => (
                    <span key={skill} style={{ fontSize: '7px', padding: '2px 6px', background: 'rgba(0,0,0,0.15)', borderRadius: '2px' }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'white' }}>
              <div>
                <h4 style={{ fontSize: '18px', fontWeight: 900, color: '#1e293b', textTransform: 'uppercase', lineHeight: 1 }}>Directrice Marketing</h4>
                <div style={{ height: '3px', width: '40px', background: '#2563eb', marginTop: '6px' }} />
              </div>

              <section>
                <h5 style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Parcours Professionnel
                  <div style={{ height: '1px', flex: 1, background: '#e2e8f0' }} />
                </h5>
                <div style={{ marginTop: '10px', position: 'relative', paddingLeft: '14px', borderLeft: '1px solid #e2e8f0' }}>
                  <div style={{ position: 'absolute', left: '-5px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }} />
                  <div style={{ fontWeight: 700, fontSize: '10px', marginBottom: '2px' }}>Canal+ Gabon — Directrice Marketing</div>
                  <div style={{ fontSize: '8px', color: '#64748b', marginBottom: '4px' }}>Janvier 2022 — Présent</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ height: '4px', background: '#f1f5f9', width: '100%' }} />
                    <div style={{ height: '4px', background: '#f1f5f9', width: '90%' }} />
                  </div>
                </div>
                <div style={{ marginTop: '12px', position: 'relative', paddingLeft: '14px', borderLeft: '1px solid #e2e8f0' }}>
                  <div style={{ position: 'absolute', left: '-5px', top: '4px', width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }} />
                  <div style={{ fontWeight: 700, fontSize: '10px', marginBottom: '2px' }}>Airtel Gabon — Responsable Brand</div>
                  <div style={{ fontSize: '8px', color: '#64748b', marginBottom: '4px' }}>2019 — 2021</div>
                </div>
              </section>
            </div>
          </div>
        )}

        {id === "minimal" && (
          <div style={{ padding: '40px', fontSize: '9px', fontFamily: 'sans-serif', backgroundColor: 'white' }}>
            <h4 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.5px', color: '#0f172a', marginBottom: '4px' }}>Patrick Nguema</h4>
            <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '3px', color: '#94a3b8', marginBottom: '32px' }}>Ingénieur Réseaux & Télécoms</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <section>
                <h5 style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '2px', color: '#cbd5e1', fontWeight: 600, marginBottom: '8px' }}>Expérience</h5>
                <div style={{ height: '1px', background: '#f1f5f9', marginBottom: '12px' }} />
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>Gabon Telecom — Expert Backbone</div>
                  <div style={{ color: '#94a3b8', fontSize: '8px', marginBottom: '6px' }}>2020 — Présent</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ height: '2px', background: '#f8fafc', width: '100%' }} />
                    <div style={{ height: '2px', background: '#f8fafc', width: '95%' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600, color: '#0f172a', marginBottom: '2px' }}>MTN Gabon — Ingénieur Support</div>
                  <div style={{ color: '#94a3b8', fontSize: '8px' }}>2017 — 2020</div>
                </div>
              </section>
              
              <section>
                <h5 style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '2px', color: '#cbd5e1', fontWeight: 600, marginBottom: '8px' }}>Expertise Tech</h5>
                <div style={{ height: '1px', background: '#f1f5f9', marginBottom: '12px' }} />
                <div style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '2px', width: '100%' }} />
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '2px', width: '80%' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '2px', width: '90%' }} />
                    <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '2px', width: '70%' }} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {id === "executive" && (
          <div style={{ fontFamily: 'sans-serif', backgroundColor: 'white' }}>
            <div style={{ height: '6px', background: '#4f46e5', width: '100%' }} />
            <div style={{ padding: '20px 28px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <h4 style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>Christine Mezui</h4>
                <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '2px', color: '#4f46e5', marginTop: '6px', fontWeight: 600 }}>Directrice Générale Adjointe</p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '8px', color: '#64748b', fontWeight: 500 }}>
                Libreville, Gabon<br />mezui.christine@gov.ga
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', padding: '20px 28px' }}>
              <div>
                <h5 style={{ fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#4f46e5', borderBottom: '2px solid #4f46e5', paddingBottom: '4px', marginBottom: '12px' }}>Parcours Exécutif</h5>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#1e293b' }}>SEEG — DG Adjointe en charge de la Stratégie</div>
                  <div style={{ fontSize: '8px', color: '#4f46e5', fontWeight: 600, marginBottom: '6px' }}>2021 — Présent</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ height: '3px', background: '#f1f5f9', width: '100%' }} />
                    <div style={{ height: '3px', background: '#f1f5f9', width: '98%' }} />
                    <div style={{ height: '3px', background: '#f1f5f9', width: '95%' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#1e293b' }}>Ministère de l'Économie — Conseillère Spéciale</div>
                  <div style={{ fontSize: '8px', color: '#4f46e5', fontWeight: 600, marginBottom: '4px' }}>2018 — 2021</div>
                </div>
              </div>
              <div>
                <h5 style={{ fontSize: '8px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#4f46e5', borderBottom: '2px solid #4f46e5', paddingBottom: '4px', marginBottom: '12px' }}>Gouvernance</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                   {['Gestion de Crise', 'Stratégie Public-Privé', 'Leadership', 'Relations Institutionnelles'].map(item => (
                     <div key={item} style={{ fontSize: '8px', fontWeight: 500, color: '#475569', display: 'flex', alignItems: 'center', gap: '4px' }}>
                       <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#4f46e5' }} />
                       {item}
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {id === "tech" && (
          <div style={{ background: '#0f172a', padding: '24px', fontFamily: '"Space Mono", monospace', color: '#e2e8f0' }}>
            <div style={{ borderBottom: '1px solid rgba(16,185,129,0.2)', paddingBottom: '16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ fontSize: '22px', fontWeight: 700, color: 'white', letterSpacing: '-0.5px', lineHeight: 1 }}>Fatima Diallo</h4>
                <div style={{ marginTop: '8px', display: 'flex', gap: '6px' }}>
                  <span style={{ fontSize: '8px', background: 'rgba(16,185,129,0.15)', color: '#10b981', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '2px', padding: '2px 8px' }}>FULLSTACK_DEV</span>
                  <span style={{ fontSize: '8px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', borderRadius: '2px', padding: '2px 8px' }}>v2.4.0</span>
                </div>
              </div>
              <div style={{ fontSize: '7px', color: '#475569', textAlign: 'right' }}>
                {`{ location: "Dakar", available: true }`}
              </div>
            </div>

            <section style={{ marginBottom: '20px' }}>
              <h5 style={{ fontSize: '7px', textTransform: 'uppercase', letterSpacing: '2px', color: '#10b981', fontWeight: 700, marginBottom: '10px' }}>{`// experience.map()`}</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '8px', borderLeft: '1px solid rgba(16,185,129,0.1)' }}>
                <div>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: 'white' }}>Wave Africa — Senior Engineer</div>
                  <div style={{ fontSize: '7px', color: '#10b981', opacity: 0.6, marginBottom: '4px' }}>const duration = "2021-PRESENT"</div>
                  <div style={{ height: '4px', background: 'rgba(16,185,129,0.05)', width: '100%', borderRadius: '1px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '9px', fontWeight: 700, color: 'white' }}>Jumia Senegal — React Developer</div>
                  <div style={{ fontSize: '7px', color: '#10b981', opacity: 0.6 }}>const duration = "2019-2021"</div>
                </div>
              </div>
            </section>

            <section>
              <h5 style={{ fontSize: '7px', textTransform: 'uppercase', letterSpacing: '2px', color: '#10b981', fontWeight: 700, marginBottom: '8px' }}>{`// tech_stack.json`}</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'TypeScript'].map(tech => (
                  <span key={tech} style={{ fontSize: '7px', padding: '2px 6px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#10b981', borderRadius: '2px' }}>{tech}</span>
                ))}
              </div>
            </section>
          </div>
        )}

        {id === "elegant" && (
          <div style={{ padding: '28px', fontFamily: '"Cormorant Garamond", serif', color: '#1a1a1a', backgroundColor: 'white' }}>
            <div style={{ textAlign: 'center', paddingBottom: '16px', marginBottom: '16px', position: 'relative' }}>
              <h4 style={{ fontSize: '26px', fontWeight: 600, fontStyle: 'italic', letterSpacing: '1px', color: '#1a1a1a', lineHeight: 1 }}>Michel Nze</h4>
              <p style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '3px', color: '#e11d48', fontWeight: 400, marginTop: '4px', fontFamily: 'sans-serif' }}>Avocat d'Affaires International</p>
              <div style={{ width: '40px', height: '2px', background: '#e11d48', margin: '12px auto 0' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '20px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <h5 style={{ fontSize: '7px', textTransform: 'uppercase', letterSpacing: '2px', color: '#e11d48', fontWeight: 600 }}>Parcours</h5>
                  <div style={{ flex: 1, height: '1px', background: '#f0e6e6' }} />
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e11d48' }} />
                  <div style={{ flex: 1, height: '1px', background: '#f0e6e6' }} />
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: '#1a1a1a', fontStyle: 'italic' }}>Cabinet Nzé & Associés — Associé Principal</div>
                  <div style={{ fontSize: '8px', color: '#888', marginBottom: '4px', fontFamily: 'sans-serif' }}>Libreville — Depuis 2015</div>
                  <div style={{ height: '1px', background: '#f9f9f9', marginBottom: '2px' }} />
                  <div style={{ height: '1px', background: '#f9f9f9', width: '90%' }} />
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                   <h5 style={{ fontSize: '7px', textTransform: 'uppercase', letterSpacing: '2px', color: '#e11d48', fontWeight: 600 }}>Formation</h5>
                   <div style={{ flex: 1, height: '1px', background: '#f0e6e6' }} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600 }}>Doctorat en Droit Privé</div>
                  <div style={{ fontSize: '8px', color: '#666', fontFamily: 'sans-serif' }}>Paris II Panthéon-Assas</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {id === "compact" && (
          <div style={{ padding: '20px 24px', fontSize: '8.5px', fontFamily: 'sans-serif', backgroundColor: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '10px', borderBottom: '2px solid #ea580c', marginBottom: '12px' }}>
              <div>
                <h4 style={{ fontSize: '20px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#1a1a1a', lineHeight: 1 }}>Awa Traoré</h4>
                <p style={{ fontSize: '9px', color: '#ea580c', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '2px' }}>Chargée Ressources Humaines Senior</p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '7px', color: '#666' }}>
                Libreville, Gabon<br />awa.traore@email.ga
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '0 20px' }}>
              <div>
                <div style={{ fontSize: '7px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'white', background: '#ea580c', padding: '2px 6px', display: 'inline-block', marginBottom: '6px' }}>Expériences Clés</div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, color: '#1a1a1a' }}>COMILOG — Responsable Recrutement</div>
                  <div style={{ fontSize: '7.5px', color: '#ea580c', marginBottom: '3px' }}>2019 — Présent</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ height: '3px', background: '#f3f4f6', width: '100%' }} />
                    <div style={{ height: '3px', background: '#f3f4f6', width: '95%' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontWeight: 700, color: '#1a1a1a' }}>Bolloré Africa Logistics — RH Junior</div>
                  <div style={{ fontSize: '7.5px', color: '#ea580c' }}>2016 — 2019</div>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '7px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'white', background: '#1a1a1a', padding: '2px 6px', display: 'inline-block', marginBottom: '6px' }}>Compétences</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                   {['Gestion de Paie', 'Droit du Travail', 'Recrutement IT', 'Formation Staff'].map(item => (
                     <div key={item} style={{ borderBottom: '1px solid #f3f4f6', paddingBottom: '2px' }}>{item}</div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {id === "creative" && (
          <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif', backgroundColor: 'white' }}>
            <div style={{ padding: '24px 32px', background: '#9333ea', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-1px', lineHeight: 1 }}>Kevin Ondo</h4>
                <p style={{ fontSize: '10px', fontWeight: 600, opacity: 0.8, textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>Product Designer UI/UX</p>
              </div>
              <div style={{ width: '56px', height: '56px', background: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9333ea', fontSize: '20px', fontWeight: 900 }}>KO</div>
            </div>

            <div style={{ padding: '24px 32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                   <div style={{ width: '8px', height: '8px', background: '#9333ea', transform: 'rotate(45deg)' }} />
                   <h5 style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', color: '#9333ea' }}>Portfolio</h5>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '10px' }}>Agence Créative — Lead Designer</div>
                  <div style={{ fontSize: '8px', color: '#9333ea', marginBottom: '4px' }}>2021 — 2024</div>
                  <div style={{ height: '40px', width: '100%', background: '#f3e8ff', borderRadius: '4px' }} />
                </div>
              </section>
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                   <div style={{ width: '8px', height: '8px', background: '#9333ea', transform: 'rotate(45deg)' }} />
                   <h5 style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', color: '#9333ea' }}>Toolbox</h5>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['Figma', 'Webflow', 'React', 'Three.js', 'Blender'].map(tool => (
                    <span key={tool} style={{ fontSize: '8px', padding: '3px 10px', background: '#f3e8ff', color: '#9333ea', borderRadius: '100px', fontWeight: 600 }}>{tool}</span>
                  ))}
                </div>
              </section>
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
