import { Sora } from "next/font/google"
import Link from "next/link"
import { ArrowLeft, FileText, CreditCard, Scale, HelpCircle } from "lucide-react"

const sora = Sora({ subsets: ["latin"] })

export default function TermsPage() {
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

      <main className="container mx-auto px-6 max-w-3xl">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
              <Scale size={28} />
            </div>
            <h1 className={`${sora.className} text-3xl md:text-4xl font-black tracking-tight`}>
              Conditions Générales
            </h1>
          </div>

          <div className="prose prose-slate prose-lg max-w-none space-y-8 text-slate-600 leading-relaxed">
            <section>
              <p>
                Bienvenue sur MonCV.ga. En utilisant notre service, vous acceptez les présentes conditions d'utilisation. 
                Veuillez les lire attentivement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={`${sora.className} text-xl font-bold text-slate-900 flex items-center gap-2`}>
                <FileText size={20} className="text-indigo-500" />
                1. Service de création de CV
              </h2>
              <p>
                MonCV.ga met à disposition des outils de création, de personnalisation et d'optimisation de CV assistés par intelligence artificielle. 
                Le contenu généré reste sous votre entière responsabilité.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={`${sora.className} text-xl font-bold text-slate-900 flex items-center gap-2`}>
                <CreditCard size={20} className="text-indigo-500" />
                2. Tarification et Paiement
              </h2>
              <p>
                L'accès à l'éditeur est gratuit. Le téléchargement de votre CV au format PDF professionnel est soumis à un paiement unique de :
              </p>
              <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 text-center">
                <p className="text-3xl font-black text-indigo-600 mb-2">2 000 FCFA</p>
                <p className="text-sm text-indigo-400 uppercase font-bold tracking-widest">Paiement par Mobile Money</p>
              </div>
              <p>
                Le paiement donne droit au téléchargement illimité du CV payé pendant une période de 30 jours après l'achat. 
                Toute modification majeure nécessitant un nouveau document peut entraîner un nouveau paiement.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={`${sora.className} text-xl font-bold text-slate-900 flex items-center gap-2`}>
                <HelpCircle size={20} className="text-indigo-500" />
                3. Remboursements
              </h2>
              <p>
                En raison de la nature numérique du service, aucun remboursement n'est effectué après le téléchargement du fichier, 
                sauf en cas de défaut technique majeur avéré empêchant la lecture du document.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={`${sora.className} text-xl font-bold text-slate-900 flex items-center gap-2`}>
                <Scale size={20} className="text-indigo-500" />
                4. Droit applicable
              </h2>
              <p>
                Les présentes conditions sont régies par le droit en vigueur en République Gabonaise.
              </p>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <p className="text-sm text-slate-400">
                Pour toute assistance technique, veuillez nous contacter via la page dédiée.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
