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
import { RevealOnScroll } from "@/components/marketing/reveal-on-scroll";
import { Sora, Inter } from "next/font/google";

const sora = Sora({ subsets: ["latin"], weight: ["400", "600", "700", "800"] });
const inter = Inter({ subsets: ["latin"] });

const KentePattern = () => (
  <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none overflow-hidden">
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="kente" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M40 0 L80 40 L40 80 L0 40 Z" fill="none" stroke="#4F46E5" strokeWidth="1"/>
          <path d="M40 20 L60 40 L40 60 L20 40 Z" fill="none" stroke="#4F46E5" strokeWidth="0.5"/>
          <path d="M0 0 L80 80 M80 0 L0 80" stroke="#4F46E5" strokeWidth="0.2" strokeDasharray="2,2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#kente)" />
    </svg>
  </div>
);

export default function Home() {
  return (
    <div className={`flex flex-col w-full bg-[#FAFAF8] text-slate-900 ${inter.className} selection:bg-indigo-100 selection:text-indigo-900`}>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        .shimmer-effect::after {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 3s infinite;
        }
        .pulse-ring::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 3rem;
          background: rgba(79, 70, 229, 0.15);
          z-index: -1;
          animation: pulse-ring 3s infinite ease-in-out;
        }
      `}} />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-36 overflow-hidden">
        <KentePattern />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-slate-200 text-indigo-700 font-bold text-xs uppercase tracking-widest mb-10 shadow-sm animate-fade-up"
              style={{ animationDelay: '0ms' }}
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>✨ Conçu pour l'Afrique francophone</span>
            </div>
            
            <h1 
              className={`text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-slate-900 animate-fade-up ${sora.className}`}
              style={{ animationDelay: '150ms' }}
            >
              Ton prochain emploi commence par un CV qui impressionne.
            </h1>
            
            <p 
              className="text-xl md:text-2xl text-slate-500 mb-14 leading-relaxed max-w-2xl mx-auto font-medium animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              Des candidats à travers toute l'Afrique francophone utilisent MonCV.ga pour créer des CV professionnels assistés par l'IA en moins de 10 minutes — et décrocher des entretiens.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12 animate-fade-up"
              style={{ animationDelay: '450ms' }}
            >
              <Link 
                href="/editor/new?reset=true" 
                className="w-full sm:w-auto px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-indigo-200 hover:-translate-y-1 hover:shadow-indigo-300/50 relative overflow-hidden shimmer-effect group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Créer mon CV gratuitement →
                  <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                href="#templates" 
                className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 hover:border-slate-200 text-slate-600 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-2 hover:bg-slate-50"
              >
                Voir les modèles ↓
              </Link>
            </div>
            
            <div 
              className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-xs font-black uppercase tracking-widest text-slate-400 animate-fade-up"
              style={{ animationDelay: '600ms' }}
            >
              <div className="flex items-center gap-2 group cursor-help">
                <CheckCircle2 size={16} className="text-emerald-500 group-hover:scale-125 transition-transform" />
                <span>✓ Éditeur IA 100% gratuit</span>
              </div>
              <div className="flex items-center gap-2 group cursor-help">
                <CheckCircle2 size={16} className="text-emerald-500 group-hover:scale-125 transition-transform" />
                <span>✓ Résultat visible avant paiement</span>
              </div>
              <div className="flex items-center gap-2 group cursor-help">
                <CheckCircle2 size={16} className="text-emerald-500 group-hover:scale-125 transition-transform" />
                <span>✓ PDF HD • 2 000 FCFA paiement unique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Badges Section */}
      <section className="py-16 border-y border-slate-100 bg-white shadow-sm relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10">
            {[
              { icon: ShieldCheck, text: "Mobile Money, Cartes & Wave — Powered by Chariow" },
              { icon: Zap, text: "Optimisé pour passer les filtres ATS" },
              { icon: Smartphone, text: "Créé sur mobile en 10 minutes" },
              { icon: Lock, text: "Tes données t'appartiennent" }
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-400 font-bold text-sm uppercase tracking-widest group transition-all hover:text-indigo-600 hover:-translate-y-1">
                <badge.icon size={22} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                <span>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Templates Section */}
      <section id="templates" className="py-40 bg-slate-50/50 scroll-mt-20">
        <div className="container mx-auto px-6 text-center">
          <RevealOnScroll>
            <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight ${sora.className}`}>Des modèles qui ouvrent des portes</h2>
            <p className="text-slate-500 text-lg mb-20 max-w-2xl mx-auto">Conçus avec des recruteurs africains pour un impact immédiat dès la première lecture.</p>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {/* Classic */}
            <RevealOnScroll delay={100}>
              <div className="flex flex-col items-center">
                <ClassicPreview />
                <h3 className={`text-2xl font-bold mt-4 mb-3 ${sora.className}`}>Le Classique</h3>
                <p className="text-slate-500 text-sm max-w-[240px] leading-relaxed">
                  Sobre, structuré, intemporel. Le choix des secteurs Banque, Droit, Pétrole et Finance.
                </p>
              </div>
            </RevealOnScroll>
            
            {/* Modern */}
            <RevealOnScroll delay={250}>
              <div className="flex flex-col items-center">
                <ModernPreview />
                <h3 className={`text-2xl font-bold mt-4 mb-3 ${sora.className}`}>Le Moderne</h3>
                <p className="text-slate-500 text-sm max-w-[240px] leading-relaxed">
                  Audacieux et mémorable. Idéal pour la Tech, le Marketing et les startups africaines.
                </p>
              </div>
            </RevealOnScroll>
            
            {/* Minimal */}
            <RevealOnScroll delay={400}>
              <div className="flex flex-col items-center">
                <MinimalPreview />
                <h3 className={`text-2xl font-bold mt-4 mb-3 ${sora.className}`}>Le Minimaliste</h3>
                <p className="text-slate-500 text-sm max-w-[240px] leading-relaxed">
                  Épuré et efficace. L'IA recommande ce modèle pour les candidats avec une forte expérience à valoriser.
                </p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section className="py-40 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-slate-50/50 to-transparent opacity-10"></div>
        
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <RevealOnScroll>
              <h2 className={`text-4xl md:text-6xl font-black mb-24 text-center tracking-tight ${sora.className}`}>De zéro à candidature en 10 minutes</h2>
            </RevealOnScroll>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-slate-800 -z-0"></div>
              
              {[
                { icon: Paintbrush2, title: "1. Remplis", text: "Importe ton ancien CV ou laisse-toi guider par notre formulaire intelligent." },
                { icon: BrainCircuit, title: "2. L'IA optimise", text: "Notre IA reformule ton parcours en phrases percutantes qui accrochent les recruteurs africains." },
                { icon: Download, title: "3. Télécharge", text: "Paye 2 000 FCFA uniquement si le résultat te convainc. Mobile Money, carte bancaire ou Wave — paiement sécurisé via Chariow, disponible partout en Afrique." }
              ].map((step, i) => (
                <RevealOnScroll key={i} delay={i * 200} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-24 h-24 bg-slate-800/50 rounded-3xl flex items-center justify-center mb-8 border border-slate-700 transition-all duration-500 group-hover:border-indigo-500 group-hover:bg-indigo-500/20 group-hover:-translate-y-2">
                    <step.icon size={40} className="text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  </div>
                  <h4 className={`text-2xl font-bold mb-4 ${sora.className}`}>{step.title}</h4>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {step.text}
                  </p>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 Testimonials Section */}
      <section className="py-32 bg-white">
        <RevealOnScroll>
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight ${sora.className}`}>
                Ce qu'ils disent après leur premier entretien
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Premiers retours de notre communauté à travers l'Afrique francophone
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[
                {
                  text: "J'avais peur que ce soit compliqué depuis mon téléphone. En 15 minutes mon CV était prêt. J'ai eu un entretien la semaine suivante.",
                  name: "Ornella M.",
                  city: "Abidjan, Côte d'Ivoire",
                  post: "Assistante RH"
                },
                {
                  text: "L'IA a reformulé mes expériences mieux que je n'aurais pu le faire moi-même. Le paiement via Mobile Money était instantané.",
                  name: "Patrick A.",
                  city: "Libreville, Gabon",
                  post: "Technicien Pétrole"
                },
                {
                  text: "2 000 FCFA pour un CV qui fait vraiment la différence. Simple, rapide, professionnel. Je recommande à tous mes collègues.",
                  name: "Christelle B.",
                  city: "Dakar, Sénégal",
                  post: "Comptable OHADA"
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg shadow-slate-100">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, starIndex) => (
                      <span key={starIndex} className="text-amber-400">★</span>
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-400 italic">{testimonial.city} • {testimonial.post}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-slate-300 mt-8 italic text-center">
              Témoignages illustratifs — prénoms modifiés.
            </p>
          </div>
        </RevealOnScroll>
      </section>

      {/* 5. Pricing Section */}
      <section className="py-40 bg-[#FAFAF8] relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <RevealOnScroll>
            <div className="max-w-xl mx-auto p-12 md:p-16 rounded-[3.5rem] bg-indigo-600 text-white shadow-3xl shadow-indigo-200 relative overflow-hidden pulse-ring group">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
              
              <h2 className="text-sm font-black mb-6 uppercase tracking-[0.3em] opacity-80">Un tarif unique. Transparent. Africain.</h2>
              <div className="flex items-baseline justify-center gap-2 mb-10">
                <span className={`text-8xl font-black tracking-tighter ${sora.className}`}>2 000</span>
                <span className="text-3xl font-black">FCFA</span>
              </div>
              
              <p className="text-indigo-100 mb-6 text-xl leading-relaxed font-medium">
                ~2.99$ • Sans abonnement • Sans frais cachés
              </p>

              <div className="text-indigo-200 text-sm text-center mb-10">
                <p>💳 Mobile Money • Carte bancaire • Wave</p>
                <p>Paiement sécurisé via Chariow</p>
              </div>
              
              <div className="space-y-5 mb-14 text-left max-w-[280px] mx-auto border-y border-white/10 py-8">
                {[
                  "PDF Haute Définition prêt à envoyer",
                  "Téléchargement immédiat après paiement",
                  "Compatible tous appareils — mobile & desktop"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                    <span className="font-bold text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <Link 
                href="/editor/new?reset=true" 
                className="block w-full py-6 bg-white text-indigo-600 rounded-[2rem] font-black text-2xl hover:scale-[1.03] active:scale-[0.97] transition-all shadow-xl hover:shadow-white/20 relative overflow-hidden shimmer-effect"
              >
                Créer mon CV maintenant
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Footer minimaliste */}
      <footer className="py-20 border-t border-slate-200 bg-white text-center">
        <div className="container mx-auto px-6">
          <p className={`text-2xl font-black mb-4 text-slate-900 ${sora.className}`}>MonCV<span className="text-indigo-600">.ga</span></p>
          <p className="text-slate-400 text-sm font-medium">
            © {new Date().getFullYear()} — Le CV professionnel accessible à tous en Afrique francophone.
          </p>
          <div className="flex justify-center gap-8 mt-8 text-xs font-black uppercase tracking-widest text-slate-300">
            <Link href="/privacy" className="hover:text-indigo-500 transition-colors">Confidentialité</Link>
            <Link href="/terms" className="hover:text-indigo-500 transition-colors">Conditions</Link>
            <Link href="/contact" className="hover:text-indigo-500 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
