"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from "next/navigation"
import { 
  Sparkles, 
  ChevronLeft, 
  Download, 
  LayoutDashboard, 
  Eye,
  User,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Globe2,
  Users,
  Palette,
  Save,
  Medal,
  Trophy,
  Heart
} from "lucide-react"

import { useAuth } from "@/hooks/use-auth"
import { saveCV } from "@/lib/api/cv-service"

import { useCVStore } from "@/store/cv-store"
import { Button } from "@/components/ui/button"
import { ImportCVModal } from "@/components/editor/import-cv-modal"
import { Upload } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetDescription 
} from "@/components/ui/sheet"

// Form Components
import { PersonalInfoForm } from "@/components/editor/personal-info-form"
import { ExperienceForm } from "@/components/editor/experience-form"
import { EducationForm } from "@/components/editor/education-form"
import { SkillsForm } from "@/components/editor/skills-form"
import { LanguagesForm } from "@/components/editor/languages-form"
import { ReferencesForm } from "@/components/editor/references-form"
import { CertificationsForm } from "@/components/editor/certifications-form"
import { AccomplishmentsForm } from "@/components/editor/accomplishments-form"
import { HobbiesForm } from "@/components/editor/hobbies-form"
import { DesignPanel } from "@/components/editor/design-panel"
import { CVPreview } from "@/components/editor/cv-preview"
import { PaymentModal } from "@/components/payment/payment-modal"
import { cn } from "@/lib/utils"

function NewEditorInner({ initialCvId }: { initialCvId?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { currentCV, isHydrated } = useCVStore()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("personal")
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  
  const [cvId, setCvId] = useState<string | null>(initialCvId || null)
  const [isSaving, setIsSaving] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const { resetCV } = useCVStore()

  // Reset store ONLY when the user explicitly requests a new CV via ?reset=true.
  // This prevents wiping the store when the user comes back from login
  // via ?next=/editor/new (which never carries ?reset=true).
  useEffect(() => {
    if (!initialCvId && searchParams.get('reset') === 'true') {
      resetCV()
    }
  }, [initialCvId, searchParams, resetCV])

  // Calculate completion progress

  const generatePDF = async (isPaid: boolean) => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: currentCV.content,
          settings: currentCV.settings,
          isPaid,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Erreur serveur PDF')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${currentCV.content.personalInfo.fullName || 'MonCV'}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success(isPaid ? 'PDF téléchargé avec succès !' : 'PDF brouillon téléchargé.')
    } catch (error: any) {
      console.error('Erreur PDF:', error)
      toast.error(`Erreur: ${error.message}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownloadClick = async () => {
    if (!user) {
      toast.info("Connectez-vous pour télécharger votre CV", {
        action: {
          label: "Se connecter",
          onClick: () => router.push("/login?next=/editor/new"),
        },
      })
      return
    }

    const isPaid = currentCV.isPaid || false
    if (isPaid) {
      generatePDF(true)
    } else {
      setIsPaymentModalOpen(true)
    }
  }

  const handleSaveCV = async () => {
    if (!user) {
      toast.info("Connectez-vous pour sauvegarder votre CV", {
        action: {
          label: "Se connecter",
          onClick: () => router.push("/login?next=/editor/new"),
        },
      })
      return
    }

    setIsSaving(true)
    try {
      const savedDoc = await saveCV(currentCV, cvId)
      if (!cvId) {
        setCvId(savedDoc.id)
      }
      toast.success("CV sauvegardé !")
    } catch (error) {
      toast.error("Erreur lors de la sauvegarde du CV")
    } finally {
      setIsSaving(false)
    }
  }

  // Load animation check
  const completionPercentage = useMemo(() => {
    if (!currentCV) return 0
    let score = 0
    let total = 6 // 6 main content sections

    const { content } = currentCV
    if (content.personalInfo.fullName && content.personalInfo.email) score += 1
    if (content.experiences.length > 0) score += 1
    if (content.education.length > 0) score += 1
    if (content.skills.length > 0) score += 1
    if (content.languages.length > 0) score += 1
    if (content.references.length > 0) score += 1

    return Math.round((score / total) * 100)
  }, [currentCV])

  // Check if design has been customized (for the dot indicator)
  const isCustomized = useMemo(() => {
    if (!currentCV) return false
    const { settings } = currentCV
    return settings.templateId !== "classic" || settings.accentColor !== "#6C63FF"
  }, [currentCV])

  if (!isHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">Chargement de votre éditeur...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <div className="flex h-16 items-center justify-between px-4 sm:px-8 max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push("/")}
              className="hidden sm:flex text-muted-foreground"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight hidden sm:inline-block">MonCV</span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline-block">/</span>
              <span className="text-sm font-medium text-muted-foreground truncate max-w-[150px]">
                {currentCV.title || "Nouveau CV"}
              </span>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center px-4 max-w-md mx-auto">
            <div className="w-full space-y-1.5">
              <div className="flex justify-between text-[10px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-1.5">
                   <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                   Progression de votre CV
                </span>
                <span>{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-1.5" />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="outline" size="sm" onClick={() => setIsImportModalOpen(true)} className="hidden sm:flex hover:bg-zinc-100 dark:hover:bg-zinc-800">
              <Upload className="h-4 w-4 mr-2" />
              Importer un CV
            </Button>
            {/* Design Customization Button (Sheet) */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative font-semibold border-primary/20 hover:bg-primary/5 text-primary">
                  <Palette className="h-4 w-4 mr-2" />
                  Design
                  {isCustomized && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-[400px] overflow-y-auto">
                <SheetHeader className="mb-6">
                  <SheetTitle>Personnalisation</SheetTitle>
                  <SheetDescription>
                    Modifiez l'apparence de votre CV en temps réel.
                  </SheetDescription>
                </SheetHeader>
                <DesignPanel />
              </SheetContent>
            </Sheet>

            {/* Mobile Preview Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <Eye className="h-4 w-4 mr-2" />
                  Aperçu
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[90vh] p-0 overflow-hidden bg-zinc-100">
                <SheetHeader className="p-4 border-b bg-white">
                  <SheetTitle className="text-sm font-semibold">Aperçu en temps réel</SheetTitle>
                </SheetHeader>
                <div className="p-4 h-full overflow-y-auto flex justify-center pb-24">
                  <div className="w-full max-w-[800px]">
                    <CVPreview />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button onClick={handleSaveCV} disabled={isSaving} variant="outline" className="hidden sm:flex border-primary/20 hover:bg-primary/5 text-primary font-semibold h-9 px-4">
              {isSaving ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /><span>Enregistrement...</span></>
              ) : (
                <><Save className="h-4 w-4 mr-2" /><span>Sauvegarder</span></>
              )}
            </Button>

            <Button onClick={handleDownloadClick} disabled={isGenerating} className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-semibold group h-9 px-4 sm:px-6">
              {isGenerating ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" /><span className="hidden sm:inline">Génération...</span></>
              ) : (
                <><Download className="h-4 w-4 mr-2 group-hover:animate-bounce" /><span className="hidden sm:inline">Télécharger PDF</span><span className="sm:hidden text-xs">PDF</span></>
              )}
            </Button>
          </div>
        </div>
      </header>

      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        cvId={cvId} 
        onAlreadyPaid={() => {
          useCVStore.setState((state) => ({
            currentCV: { ...state.currentCV, isPaid: true }
          }))
          generatePDF(true)
        }} 
      />
      <ImportCVModal open={isImportModalOpen} onOpenChange={setIsImportModalOpen} />
      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] mx-auto w-full flex overflow-hidden">
        {/* Left Side: Forms */}
        <div className="flex-1 lg:max-w-[55%] border-r border-zinc-200 dark:border-zinc-800 flex flex-col items-center overflow-y-auto">
          <div className="w-full max-w-2xl px-6 py-8 sm:py-12 pb-32 sm:pb-12">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab} 
              className="w-full space-y-8"
            >
              <div className="overflow-x-auto pb-1 scrollbar-hide">
                <TabsList className="inline-flex h-12 sm:h-10 items-center justify-start rounded-md bg-zinc-100/80 dark:bg-zinc-900/80 p-1 text-muted-foreground w-auto min-w-full sm:min-w-0">
                  <TabsTrigger value="personal" title="Profil Professionnel" className="gap-2 px-3 sm:px-4 py-2 sm:py-1.5 flex-1 sm:flex-initial">
                    <User className="h-4 w-4" /> <span className="hidden sm:inline text-xs sm:text-sm">Profil</span>
                  </TabsTrigger>
                  <TabsTrigger value="experience" title="Expériences" className="gap-2 px-3 sm:px-4 py-2 sm:py-1.5 flex-1 sm:flex-initial">
                    <Briefcase className="h-4 w-4" /> <span className="hidden sm:inline text-xs sm:text-sm">Expérience</span>
                  </TabsTrigger>
                  <TabsTrigger value="education" title="Formation" className="gap-2 px-3 sm:px-4 py-2 sm:py-1.5 flex-1 sm:flex-initial">
                    <GraduationCap className="h-4 w-4" /> <span className="hidden sm:inline text-xs sm:text-sm">Formation</span>
                  </TabsTrigger>
                  <TabsTrigger value="skills" title="Compétences" className="gap-2 px-3 sm:px-4 py-2 sm:py-1.5 flex-1 sm:flex-initial">
                    <Lightbulb className="h-4 w-4" /> <span className="hidden sm:inline text-xs sm:text-sm">Compétences</span>
                  </TabsTrigger>
                  <TabsTrigger value="certifications" title="Certifications" className="gap-2 px-3 sm:px-4 py-2 sm:py-1.5 flex-1 sm:flex-initial">
                    <Medal className="h-4 w-4" /> <span className="hidden sm:inline text-xs sm:text-sm">Certifications</span>
                  </TabsTrigger>
                  <TabsTrigger value="accomplishments" title="Accomplissements" className="gap-2 px-3 sm:px-4 py-2 sm:py-1.5 flex-1 sm:flex-initial">
                    <Trophy className="h-4 w-4" /> <span className="hidden sm:inline text-xs sm:text-sm">Succès</span>
                  </TabsTrigger>
                  <TabsTrigger value="languages" title="Langues" className="gap-2 px-3 sm:px-4 py-2 sm:py-1.5 flex-1 sm:flex-initial">
                    <Globe2 className="h-4 w-4" /> <span className="hidden sm:inline text-xs sm:text-sm">Langues</span>
                  </TabsTrigger>
                  <TabsTrigger value="hobbies" title="Loisirs" className="gap-2 px-3 sm:px-4 py-2 sm:py-1.5 flex-1 sm:flex-initial">
                    <Heart className="h-4 w-4" /> <span className="hidden sm:inline text-xs sm:text-sm">Loisirs</span>
                  </TabsTrigger>
                  <TabsTrigger value="references" title="Références" className="gap-2 px-3 sm:px-4 py-2 sm:py-1.5 flex-1 sm:flex-initial">
                    <Users className="h-4 w-4" /> <span className="hidden sm:inline text-xs sm:text-sm">Références</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <TabsContent value="personal" className="outline-none m-0">
                  <PersonalInfoForm />
                </TabsContent>
                <TabsContent value="experience" className="outline-none m-0">
                  <ExperienceForm />
                </TabsContent>
                <TabsContent value="education" className="outline-none m-0">
                  <EducationForm />
                </TabsContent>
                <TabsContent value="skills" className="outline-none m-0">
                  <SkillsForm />
                </TabsContent>
                <TabsContent value="certifications" className="outline-none m-0">
                  <CertificationsForm />
                </TabsContent>
                <TabsContent value="accomplishments" className="outline-none m-0">
                  <AccomplishmentsForm />
                </TabsContent>
                <TabsContent value="languages" className="outline-none m-0">
                  <LanguagesForm />
                </TabsContent>
                <TabsContent value="hobbies" className="outline-none m-0">
                  <HobbiesForm />
                </TabsContent>
                <TabsContent value="references" className="outline-none m-0">
                  <ReferencesForm />
                </TabsContent>
              </div>
            </Tabs>

            <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:bg-zinc-100" 
                  disabled={activeTab === "personal"}
                  onClick={() => {
                    const tabs = ["personal", "experience", "education", "skills", "certifications", "accomplishments", "languages", "hobbies", "references"]
                    const idx = tabs.indexOf(activeTab)
                    if (idx > 0) setActiveTab(tabs[idx - 1])
                  }}
                >
                   Précédent
                </Button>
                <Button className="font-semibold shadow-lg shadow-primary/20 min-w-[120px]" 
                        onClick={() => {
                          const tabs = ["personal", "experience", "education", "skills", "certifications", "accomplishments", "languages", "hobbies", "references"]
                          const idx = tabs.indexOf(activeTab)
                          if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1])
                        }}>
                   {activeTab === "references" ? "Terminer" : "Suivant"}
                </Button>
            </div>
          </div>
        </div>

        {/* Right Side: Sticky Preview (Desktop only) */}
        <aside className="hidden lg:flex flex-1 bg-zinc-100 dark:bg-zinc-950/50 justify-center overflow-y-auto p-12 max-h-[calc(100vh-64px)] sticky top-16 scrollbar-hide">
          <div className="w-full max-w-[850px] shadow-2xl h-fit">
            <CVPreview />
          </div>
        </aside>
      </main>

      {/* Mobile Save Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 pb-10 bg-white/90 backdrop-blur-md border-t border-zinc-200 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
        <Button 
          onClick={handleSaveCV} 
          disabled={isSaving} 
          className="w-full shadow-lg font-semibold h-12 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          {isSaving ? (
            <><Loader2 className="h-5 w-5 mr-2 animate-spin" /><span>Enregistrement...</span></>
          ) : (
            <><Save className="h-5 w-5 mr-2" /><span>Sauvegarder mon CV</span></>
          )}
        </Button>
      </div>

      {/* Footer / Status */}
      <footer className="h-8 bg-white dark:bg-zinc-900 border-t flex items-center px-6 text-[10px] text-muted-foreground justify-between shrink-0 relative z-40">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Modifications enregistrées localement
          </span>
        </div>
        <div>
          Version 1.0.1
        </div>
      </footer>
    </div>
  )
}

export default function NewEditorPage({ initialCvId }: { initialCvId?: string }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm font-medium text-muted-foreground">Chargement de votre éditeur...</p>
          </div>
        </div>
      }
    >
      <NewEditorInner initialCvId={initialCvId} />
    </Suspense>
  )
}
