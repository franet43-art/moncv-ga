import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Lock,
  Download,
  Paintbrush2,
  BrainCircuit
} from "lucide-react";
import { ClassicPreview, ModernPreview, MinimalPreview } from "@/components/marketing/template-previews";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white text-slate-900 font-sans">
      {/* 1. Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-medium text-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Sparkles size={16} />
              <span>Optimisé par l'Intelligence Artificielle</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
              Vois ton CV avant de payer.<br />
              <span className="text-indigo-600">Télécharge quand tu es prêt.</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Crée et personnalise ton CV avec l'aide de l'IA — gratuitement. 
              Exporte un PDF professionnel pour 2 000 FCFA, en paiement unique. 
              Aucun abonnement caché.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link 
                href="/editor/new?reset=true" 
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
              >
                Créer mon CV maintenant
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="#templates" 
                className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-600 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                Voir les modèles ↓
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Éditeur IA gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Preview en temps réel</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>PDF HD • 2 000 FCFA</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-50">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-100 rounded-full blur-[120px]"></div>
        </div>
      </section>

      {/* 2. Trust Badges Section */}
      <section className="py-12 border-y border-slate-100 bg-slate-50/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
            <div className="flex items-center gap-3 text-slate-500 font-medium group transition-colors hover:text-indigo-600">
              <ShieldCheck size={24} className="text-indigo-500" />
              <span>Paiement Sécurisé (Mobile Money & Cartes)</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 font-medium group transition-colors hover:text-indigo-600">
              <Zap size={24} className="text-indigo-500" />
              <span>Format ATS-Friendly</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 font-medium group transition-colors hover:text-indigo-600">
              <Smartphone size={24} className="text-indigo-500" />
              <span>100% Mobile-Friendly</span>
            </div>
            <div className="flex items-center gap-3 text-slate-500 font-medium group transition-colors hover:text-indigo-600">
              <Lock size={24} className="text-indigo-500" />
              <span>Données Privées</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Templates Section */}
      <section id="templates" className="py-32 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-black mb-16 tracking-tight">Des modèles validés par les recruteurs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Classic */}
            <div className="group flex flex-col items-center">
              <div className="mb-8 transition-transform duration-500 group-hover:scale-105">
                <ClassicPreview />
              </div>
              <h3 className="text-xl font-bold mb-2">Le Classique</h3>
              <p className="text-slate-500 text-sm max-w-[210px]">
                Sobriété et élégance. Parfait pour les secteurs traditionnels (Banque, Droit, Finance).
              </p>
            </div>
            
            {/* Modern */}
            <div className="group flex flex-col items-center">
              <div className="mb-8 transition-transform duration-500 group-hover:scale-105">
                <ModernPreview />
              </div>
              <h3 className="text-xl font-bold mb-2">Le Moderne</h3>
              <p className="text-slate-500 text-sm max-w-[210px]">
                Dynamique et visuel. Idéal pour les métiers de la Tech, du Marketing et du Design.
              </p>
            </div>
            
            {/* Minimal */}
            <div className="group flex flex-col items-center">
              <div className="mb-8 transition-transform duration-500 group-hover:scale-105">
                <MinimalPreview />
              </div>
              <h3 className="text-xl font-bold mb-2">Le Minimaliste</h3>
              <p className="text-slate-500 text-sm max-w-[210px]">
                Épuré et aéré. Met l'accent sur votre parcours sans distractions inutiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black mb-20 text-center tracking-tight">Comment ça marche ?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Connector Lines (Desktop only) */}
              <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-slate-800 -z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-700 transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-500/10">
                  <Paintbrush2 size={32} className="text-indigo-400" />
                </div>
                <h4 className="text-xl font-bold mb-3">1. Remplis tes infos</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Importe ton ancien CV ou remplis le formulaire intuitivement.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-700 transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-500/10">
                  <BrainCircuit size={32} className="text-indigo-400" />
                </div>
                <h4 className="text-xl font-bold mb-3">2. Laisse l'IA sublimer</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  L'IA reformule tes expériences pour un impact maximal auprès des recruteurs.
                </p>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 border border-slate-700 transition-colors group-hover:border-indigo-500 group-hover:bg-indigo-500/10">
                  <Download size={32} className="text-indigo-400" />
                </div>
                <h4 className="text-xl font-bold mb-3">3. Paie et Télécharge</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Paie 2 000 FCFA uniquement si le résultat te plaît — puis télécharge ton PDF HD.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-lg mx-auto p-12 rounded-[2.5rem] bg-indigo-600 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden group">
            {/* Decoration */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest opacity-80">Offre Unique</h2>
            <div className="flex items-baseline justify-center gap-1 mb-8">
              <span className="text-6xl font-black">2 000</span>
              <span className="text-2xl font-bold">FCFA</span>
            </div>
            
            <p className="text-indigo-100 mb-10 text-lg leading-relaxed">
              Un paiement unique pour chaque CV finalisé.<br />
              <span className="opacity-70 text-base italic">~2.99$ • Sans abonnement</span>
            </p>
            
            <ul className="text-left space-y-4 mb-10 max-w-[240px] mx-auto">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={14} />
                </div>
                <span>PDF Haute Définition</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={14} />
                </div>
                <span>Accès à vie aux mises à jour</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={14} />
                </div>
                <span>Support Prioritaire</span>
              </li>
            </ul>

            <Link 
              href="/editor/new?reset=true" 
              className="block w-full py-5 bg-white text-indigo-600 rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Lancer mon CV maintenant
            </Link>
          </div>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} MonCV.ga — Le CV professionnel pour tous au Gabon.</p>
      </footer>
    </div>
  );
}
