"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Plus, 
  FileText, 
  MoreVertical, 
  Edit, 
  Copy, 
  Trash, 
  Download,
  Loader2,
  AlertCircle
} from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"

import { listUserCVs, deleteCV, duplicateCV } from "@/lib/api/cv-service"
import type { CVRecord } from "@/types/database"
import { PaymentModal } from "@/components/payment/payment-modal"
import { cn } from "@/lib/utils"

export function DashboardContent() {
  const router = useRouter()
  const [cvs, setCvs] = useState<CVRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cvToDelete, setCvToDelete] = useState<string | null>(null)
  const [isActionLoading, setIsActionLoading] = useState(false)
  
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [selectedCvId, setSelectedCvId] = useState<string | null>(null)

  const fetchCVs = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await listUserCVs()
      setCvs(data)
    } catch (error) {
      console.error(error)
      toast.error("Erreur lors du chargement de vos CVs")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCVs()
  }, [fetchCVs])

  const handleDelete = async () => {
    if (!cvToDelete) return
    setIsActionLoading(true)
    try {
      await deleteCV(cvToDelete)
      toast.success("CV supprimé avec succès")
      await fetchCVs()
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    } finally {
      setIsActionLoading(false)
      setCvToDelete(null)
    }
  }

  const handleDuplicate = async (id: string) => {
    setIsActionLoading(true)
    try {
      await duplicateCV(id)
      toast.success("CV dupliqué avec succès")
      await fetchCVs()
    } catch (error) {
      toast.error("Erreur lors de la duplication")
    } finally {
      setIsActionLoading(false)
    }
  }

  const handleDownload = (cv: CVRecord) => {
    if (!cv.is_paid) {
      setSelectedCvId(cv.id)
      setPaymentModalOpen(true)
      return
    }
    
    toast.success("Préparation du téléchargement...")
    router.push(`/editor/${cv.id}`)
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden border-zinc-200 dark:border-zinc-800">
              <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-9 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes CV</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos documents professionnels et suivez vos candidatures.
          </p>
        </div>
        <Button asChild className="bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Link href="/editor/new?reset=true">
            <Plus className="mr-2 h-4 w-4" />
            Créer un nouveau CV
          </Link>
        </Button>
      </div>

      {cvs.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 p-8 text-center bg-white dark:bg-zinc-900/50">
          <div className="bg-zinc-100 dark:bg-zinc-800 p-6 rounded-full mb-6">
            <FileText className="h-12 w-12 text-zinc-400" />
          </div>
          <h3 className="text-xl font-semibold">Vous n'avez pas encore de CV</h3>
          <p className="mt-2 text-muted-foreground max-w-sm">
            Créez votre premier CV professionnel en quelques minutes avec nos templates optimisés par l'IA.
          </p>
          <Button asChild className="mt-8 px-8">
            <Link href="/editor/new?reset=true">Créer mon premier CV</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cvs.map((cv) => {
            const settings = cv.settings as any
            const content = cv.content as any
            const fullName = content?.personalInfo?.fullName || "Sans titre"
            const templateId = settings?.templateId || "classic"
            const accentColor = settings?.accentColor || "#6C63FF"
            const updatedAt = new Date(cv.updated_at).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })

            return (
              <Card 
                key={cv.id} 
                className="group relative overflow-hidden border-zinc-200 transition-all hover:border-primary/50 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-bold transition-colors group-hover:text-primary">
                        {fullName}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="capitalize">
                          {templateId}
                        </Badge>
                        <div 
                          className="h-3 w-3 rounded-full border border-white/20" 
                          style={{ backgroundColor: accentColor }}
                          title={`Couleur: ${accentColor}`}
                        />
                        {cv.is_paid && (
                          <Badge variant="default" className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 hover:bg-green-500/20 text-[10px] uppercase font-bold tracking-wider">
                            PAYÉ
                          </Badge>
                        )}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/editor/${cv.id}`)}>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Modifier</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDuplicate(cv.id)} disabled={isActionLoading}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Dupliquer</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(cv)}>
                          <Download className="mr-2 h-4 w-4" />
                          <span>Télécharger PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/50"
                          onClick={() => setCvToDelete(cv.id)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Supprimer</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pb-8 pt-4">
                  <div className="relative aspect-[3/4] w-full bg-zinc-50 dark:bg-zinc-800 rounded-md border border-zinc-100 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                     <div className="absolute inset-0 opacity-20 flex flex-col items-center justify-center gap-2">
                        <FileText className="h-20 w-20" />
                        <span className="text-xs font-bold uppercase tracking-widest">{templateId}</span>
                     </div>
                     <div className="z-10 text-center p-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" asChild className="w-full">
                          <Link href={`/editor/${cv.id}`}>
                            Editer mon CV
                          </Link>
                        </Button>
                        {cv.is_paid ? (
                          <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold" onClick={() => handleDownload(cv)}>
                            <Download className="mr-2 h-4 w-4" /> Télécharger PDF
                          </Button>
                        ) : (
                          <Button size="sm" className="w-full bg-[#6C63FF] hover:bg-[#5a52d4] text-white font-semibold" onClick={() => {
                            setSelectedCvId(cv.id)
                            setPaymentModalOpen(true)
                          }}>
                            💳 Débloquer CV (500 FCFA)
                          </Button>
                        )}
                     </div>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 py-3 text-xs text-muted-foreground w-full">
                   <span>Modifié le {updatedAt}</span>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      <AlertDialog open={!!cvToDelete} onOpenChange={(open) => !open && setCvToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce CV ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les données associées à ce CV seront définitivement supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isActionLoading}>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              disabled={isActionLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {isActionLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      <PaymentModal 
        isOpen={paymentModalOpen} 
        onClose={() => setPaymentModalOpen(false)} 
        cvId={selectedCvId} 
        onAlreadyPaid={fetchCVs} 
      />
    </div>
  )
}
