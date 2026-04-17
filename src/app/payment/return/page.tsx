"use client"

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

function PaymentReturnContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const cvId = searchParams.get('cv_id')
  const saleId = searchParams.get('sale_id')
  
  const [isPaid, setIsPaid] = useState(false)
  const [isTimeout, setIsTimeout] = useState(false)
  const [attempts, setAttempts] = useState(0)

  useEffect(() => {
    if (!cvId) return

    const supabase = createClient()
    
    // Poll every 2 seconds
    const interval = setInterval(async () => {
      try {
        const { data } = await supabase
          .from('cvs')
          .select('is_paid')
          .eq('id', cvId)
          .single()

        if (data?.is_paid) {
          setIsPaid(true)
          clearInterval(interval)
        }
      } catch (err) {
        console.error('Polling error', err)
      }
      
      setAttempts(prev => {
        if (prev >= 15) { // 30 seconds
          setIsTimeout(true)
          clearInterval(interval)
        }
        return prev + 1
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [cvId])

  if (isPaid) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <CheckCircle2 className="h-16 w-16 text-green-500" />
        <h2 className="text-2xl font-bold">Paiement confirmé !</h2>
        <p className="text-muted-foreground text-center max-w-md">
          Votre CV est maintenant disponible sans filigrane.
        </p>
        <Button onClick={() => router.push(`/editor/${cvId}`)} className="mt-4 bg-[#6C63FF] hover:bg-[#5a52d4]">
          Télécharger mon CV
        </Button>
      </div>
    )
  }

  if (isTimeout) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="h-16 w-16 text-yellow-500 animate-spin" />
        <h2 className="text-2xl font-bold text-center">Paiement en cours de vérification...</h2>
        <p className="text-muted-foreground text-center max-w-sm">
          Il se peut que nous attendions encore la confirmation de l'opérateur. 
          Veuillez vérifier votre tableau de bord dans quelques instants.
        </p>
        <Button variant="outline" asChild className="mt-4">
          <Link href="/dashboard">Aller au Tableau de Bord</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader2 className="h-16 w-16 text-[#6C63FF] animate-spin" />
      <h2 className="text-2xl font-bold text-center">Vérification de votre paiement...</h2>
      <p className="text-muted-foreground">Veuillez patienter quelques instants.</p>
    </div>
  )
}

export default function PaymentReturnPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl shadow-lg max-w-lg w-full">
        <Suspense fallback={<div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#6C63FF]" /></div>}>
          <PaymentReturnContent />
        </Suspense>
      </div>
    </div>
  )
}
