import { Sora } from "next/font/google"
import Link from "next/link"
import { ArrowLeft, ShieldCheck, Lock, Eye, Trash2 } from "lucide-react"

const sora = Sora({ subsets: ["latin"] })

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-slate-900 pb-20">
      {/* Header simple */}
      <header className="py-10 container mx-auto px-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
      </header>

      <main className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <ShieldCheck size={28} />
            </div>
            <h1 className={`${sora.className} text-3xl md:text-4xl font-black tracking-tight`}>
              Politique de Confidentialité
            </h1>
          </div>

          <div className="prose prose-slate prose-lg max-w-none space-y-8 text-slate-600 leading-relaxed">
            <section>
              <p className="font-medium text-slate-900 italic">
                Dernière mise à jour : 22 avril 2026
              </p>
              <p>
                Chez MonCV.ga, nous accordons une importance capitale à la protection de vos données personnelles. 
                Cette politique détaille comment nous traitons vos informations lorsque vous utilisez notre service.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={`${sora.className} text-xl font-bold text-slate-900 flex items-center gap-2`}>
                <Eye size={20} className="text-indigo-500" />
                1. Données collectées
              </h2>
              <p>
                Pour vous fournir un CV de qualité, nous collectons les informations suivantes que vous saisissez volontairement :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><span className="font-bold text-slate-800">Identité :</span> Nom, prénom, adresse email, numéro de téléphone.</li>
                <li><span className="font-bold text-slate-800">Contenu du CV :</span> Expériences professionnelles, formations, compétences, et toute autre information incluse dans votre document.</li>
                <li><span className="font-bold text-slate-800">Paiement :</span> Les transactions sont gérées par nos partenaires de paiement (Mobile Money). Nous ne stockons pas vos coordonnées bancaires.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className={`${sora.className} text-xl font-bold text-slate-900 flex items-center gap-2`}>
                <Lock size={20} className="text-indigo-500" />
                2. Utilisation et Stockage
              </h2>
              <p>
                Vos données servent exclusivement à la génération de votre CV et à la gestion de votre compte utilisateur. 
                Elles sont stockées de manière sécurisée sur les serveurs de nos partenaires technologiques (Supabase/Vercel).
              </p>
              <p>
                Nous ne vendons, ne louons et ne partageons jamais vos données personnelles à des tiers à des fins commerciales.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={`${sora.className} text-xl font-bold text-slate-900 flex items-center gap-2`}>
                <Trash2 size={20} className="text-indigo-500" />
                3. Vos Droits
              </h2>
              <p>
                Conformément aux lois sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. 
                Vous pouvez supprimer votre CV ou votre compte à tout moment depuis votre espace personnel.
              </p>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className={`${sora.className} text-xl font-bold text-slate-900 mb-4`}>Contact</h2>
              <p>
                Pour toute question relative à vos données, contactez-nous à : <br />
                <span className="font-bold text-indigo-600">silvermakeia.99@gmail.com</span>
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
