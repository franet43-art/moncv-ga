"use client"

import { useEffect, useState, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Loader2, CheckCircle2, Smartphone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function PaymentReturnContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const cvId = searchParams.get('cv_id')
  
  const [isPaid, setIsPaid] = useState(false)
  const [isTimeout, setIsTimeout] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const checkStatus = useCallback(async () => {
    if (!cvId) return false
    
    try {
      const res = await fetch(`/api/payment/check-status?cv_id=${cvId}`)
      if (!res.ok) return false
      const data = await res.json()
      return data.is_paid === true
    } catch (err) {
      console.error('Polling error:', err)
      return false
    }
  }, [cvId])

  useEffect(() => {
    if (!cvId) return

    let cancelled = false
    const MAX_SECONDS = 60
    const INTERVAL_MS = 3000

    async function poll() {
      if (cancelled) return

      const paid = await checkStatus()
      
      if (paid) {
        setIsPaid(true)
        return
      }

      setElapsedSeconds(prev => {
        const next = prev + INTERVAL_MS / 1000
        if (next >= MAX_SECONDS) {
          setIsTimeout(true)
          return next
        }
        // Schedule next poll only if not timed out and not cancelled
        if (!cancelled) {
          setTimeout(poll, INTERVAL_MS)
        }
        return next
      })
    }

    // Initial delay before first poll (let webhook arrive)
    const initialTimer = setTimeout(poll, 2000)

    return () => {
      cancelled = true
      clearTimeout(initialTimer)
    }
  }, [cvId, checkStatus])

  if (isPaid) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-green-400/30" />
          <CheckCircle2 className="relative h-16 w-16 text-green-500" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Paiement confirmé !</h2>
          <p className="text-muted-foreground max-w-md">
            Votre CV est maintenant disponible en haute qualité, sans filigrane.
          </p>
        </div>
        <Button 
          onClick={() => router.push(`/editor/${cvId}`)} 
          className="mt-4 bg-[#6C63FF] hover:bg-[#5a52d4] font-semibold px-8 h-11"
        >
          Télécharger mon CV
        </Button>
      </div>
    )
  }

  if (isTimeout) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        <Smartphone className="h-16 w-16 text-yellow-500" />
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Paiement en cours de vérification...</h2>
          <p className="text-muted-foreground max-w-sm">
            La confirmation de l'opérateur prend plus de temps que prévu. 
            Votre paiement sera traité dès réception de la confirmation.
          </p>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <Button variant="outline" asChild>
            <Link href="/dashboard">Aller au Tableau de Bord</Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Vous serez notifié dès que le paiement sera confirmé.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-6">
      <div className="relative">
        <Loader2 className="h-16 w-16 text-[#6C63FF] animate-spin" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Vérification de votre paiement...</h2>
        <p className="text-muted-foreground">
          Veuillez confirmer le paiement sur votre téléphone.
        </p>
      </div>
      <div className="w-full max-w-xs bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-[#6C63FF] h-full rounded-full transition-all duration-1000 ease-linear"
          style={{ width: `${Math.min((elapsedSeconds / 60) * 100, 100)}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Vérification automatique en cours...
      </p>
    </div>
  )
}

export default function PaymentReturnPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-xl shadow-lg max-w-lg w-full">
        <Suspense fallback={<div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-[#6C63FF]" /></div>}>
          <PaymentReturnContent />
        </Suspense>
      </div>
    </div>
  )
}
