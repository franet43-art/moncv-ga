"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { 
  AlertTriangle, 
  Trash2, 
  ArrowLeft, 
  ShieldAlert, 
  Loader2 
} from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

export default function AccountPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [confirmText, setConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch("/api/user/delete", { method: "DELETE" })
      const data = await response.json()

      if (!response.ok) throw new Error(data.error || "Erreur lors de la suppression")

      toast.success("Votre compte a été supprimé avec succès")
      await signOut()
      router.push("/")
    } catch (error: any) {
      toast.error(error.message)
      setIsDeleting(false)
      setIsModalOpen(false)
      setStep(1)
      setConfirmText("")
    }
  }

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-1">
          <Link 
            href="/dashboard" 
            className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-4 transition-colors"
          >
            <ArrowLeft size={14} /> Retour au tableau de bord
          </Link>
          <h1 className="text-4xl font-black tracking-tight">Paramètres du compte</h1>
          <p className="text-muted-foreground">Gérez vos informations personnelles et votre sécurité.</p>
        </div>
      </div>

      <div className="space-y-8">
        {/* Section Profil */}
        <Card>
          <CardHeader>
            <CardTitle>Informations personnelles</CardTitle>
            <CardDescription>Vos identifiants de connexion.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium opacity-50 uppercase tracking-widest">Adresse Email</label>
              <Input value={user.email} disabled className="bg-zinc-50" />
            </div>
          </CardContent>
        </Card>

        {/* Section Danger */}
        <Card className="border-red-100 bg-red-50/10">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Zone de danger
            </CardTitle>
            <CardDescription>
              Actions irréversibles concernant votre compte.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white border border-red-100 rounded-2xl shadow-sm">
              <div className="space-y-1">
                <p className="font-bold text-slate-900">Supprimer mon compte</p>
                <p className="text-sm text-slate-500 max-w-md">
                  Ceci effacera définitivement tous vos CVs et informations personnelles de nos serveurs.
                </p>
              </div>
              <Button 
                variant="ghost" 
                className="text-red-500 hover:text-red-600 hover:bg-red-50 font-bold"
                onClick={() => setIsModalOpen(true)}
              >
                Supprimer définitivement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modale de confirmation en 2 étapes */}
      <Dialog open={isModalOpen} onOpenChange={(open) => {
        if (!isDeleting) {
          setIsModalOpen(open)
          if (!open) {
            setStep(1)
            setConfirmText("")
          }
        }
      }}>
        <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-red-600 p-8 text-white">
            <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mb-6">
              <AlertTriangle size={32} />
            </div>
            <DialogTitle className="text-2xl font-black mb-2">Attention</DialogTitle>
            <DialogDescription className="text-white/80 font-medium">
              Cette action est irréversible et entraînera la perte définitive de toutes vos données.
            </DialogDescription>
          </div>

          <div className="p-8 space-y-6">
            {step === 1 ? (
              <>
                <p className="text-slate-600 leading-relaxed">
                  En supprimant votre compte, vous perdrez l'accès à vos CVs payés et à l'historique de vos documents.
                </p>
                <DialogFooter className="flex-col sm:flex-col gap-3">
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700 font-bold h-12"
                    onClick={() => setStep(2)}
                  >
                    Continuer la suppression
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full h-12"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Annuler
                  </Button>
                </DialogFooter>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-900 uppercase tracking-widest text-center">
                    Tapez <span className="text-red-600">SUPPRIMER</span> pour confirmer
                  </p>
                  <Input 
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
                    placeholder="SUPPRIMER"
                    className="text-center font-black h-14 text-xl tracking-widest border-2 focus:ring-red-500/20 focus:border-red-500"
                    autoFocus
                  />
                </div>
                <DialogFooter className="flex-col sm:flex-col gap-3">
                  <Button 
                    variant="destructive"
                    className="w-full font-black h-12 text-lg"
                    disabled={confirmText !== "SUPPRIMER" || isDeleting}
                    onClick={handleDeleteAccount}
                  >
                    {isDeleting ? <Loader2 className="h-5 w-5 animate-spin" /> : "CONFIRMER LA SUPPRESSION"}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full h-12"
                    disabled={isDeleting}
                    onClick={() => setStep(1)}
                  >
                    Retour
                  </Button>
                </DialogFooter>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
