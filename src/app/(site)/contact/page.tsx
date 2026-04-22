"use client"

import { Sora } from "next/font/google"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Mail, MessageSquare, Phone, Send, ExternalLink } from "lucide-react"

const sora = Sora({ subsets: ["latin"] })

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contact MonCV.ga - de ${formData.name}`)
    const body = encodeURIComponent(`Nom: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.location.href = `mailto:silvermakeia.99@gmail.com?subject=${subject}&body=${body}`
  }

  const whatsappMessage = encodeURIComponent("Bonjour, j'ai une question concernant MonCV.ga")
  const whatsappUrl = `https://wa.me/24174667596?text=${whatsappMessage}`

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-900 pb-20">
      <header className="py-10 container mx-auto px-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
      </header>

      <main className="container mx-auto px-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Infos de contact */}
          <div className="space-y-12">
            <div>
              <h1 className={`${sora.className} text-4xl md:text-5xl font-black tracking-tight mb-6`}>
                Parlons de votre <span className="text-indigo-600">carrière</span>.
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed">
                Une question sur nos templates ? Un problème avec un paiement ? Notre équipe est là pour vous aider rapidement.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 group hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <MessageSquare size={24} />
                </div>
                <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                <p className="text-slate-400 text-sm mb-4">+241 74 66 75 96</p>
                <div className="text-emerald-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  Discuter <ExternalLink size={14} />
                </div>
              </a>

              <a 
                href="mailto:silvermakeia.99@gmail.com"
                className="p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 group hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Mail size={24} />
                </div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <p className="text-slate-400 text-sm mb-4">silvermakeia.99@gmail.com</p>
                <div className="text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  Écrire <ExternalLink size={14} />
                </div>
              </a>
            </div>

            <div className="p-8 bg-slate-900 rounded-[2rem] text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <p className="text-indigo-300 font-bold uppercase tracking-[0.2em] text-xs mb-2">Support Prioritaire</p>
              <p className="text-lg font-medium opacity-90">Réponse garantie en moins de 24h, 7j/7.</p>
            </div>
          </div>

          {/* Formulaire */}
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1">Nom complet</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="Ex: Jean-Marc Mba"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1">Adresse Email</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-widest text-slate-400 ml-1">Votre message</label>
                <textarea 
                  required
                  rows={4}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
                  placeholder="Comment pouvons-nous vous aider ?"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 active:scale-95"
              >
                Envoyer le message
                <Send size={20} />
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  )
}
