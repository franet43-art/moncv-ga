"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  cvId: string | null
  onAlreadyPaid: () => void
  onPaymentInitiated?: (cvId: string) => void
}

const COUNTRIES = [
  { code: 'GA', label: '🇬🇦 Gabon' },
  { code: 'SN', label: '🇸🇳 Sénégal' },
  { code: 'CI', label: '🇨🇮 Côte d\'Ivoire' },
  { code: 'CM', label: '🇨🇲 Cameroun' },
  { code: 'BF', label: '🇧🇫 Burkina Faso' },
  { code: 'ML', label: '🇲🇱 Mali' },
  { code: 'TG', label: '🇹🇬 Togo' },
  { code: 'BJ', label: '🇧🇯 Bénin' },
  { code: 'GN', label: '🇬🇳 Guinée' },
  { code: 'NE', label: '🇳🇪 Niger' },
  { code: 'CD', label: '🇨🇩 RDC' },
  { code: 'FR', label: '🇫🇷 France (carte bancaire)' },
  { code: 'US', label: '🌍 Autre pays (carte bancaire)' }
]

export function PaymentModal({ isOpen, onClose, cvId, onAlreadyPaid, onPaymentInitiated }: PaymentModalProps) {
  const { user } = useAuth()
  
  const [step, setStep] = useState<'form' | 'loading' | 'error'>('form')
  const [errorMessage, setErrorMessage] = useState("")

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "GA"
  })

  // Prefill email if available
  useEffect(() => {
    if (user?.email && !formData.email) {
      setFormData(prev => ({ ...prev, email: user.email! }))
    }
    // Also try to extract first name / last name from full_name if available
  }, [user, isOpen])

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setStep('form')
      setErrorMessage("")
    }
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!cvId) {
      toast.error("Sauvegardez d'abord votre CV avant de payer")
      return
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.countryCode) {
      toast.error("Veuillez remplir tous les champs")
      return
    }

    setStep('loading')

    try {
      const response = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cvId,
          customerFirstName: formData.firstName,
          customerLastName: formData.lastName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerCountryCode: formData.countryCode
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de l'initiation du paiement")
      }

      if (data.already_paid) {
        // Redirect to the polling page which will detect is_paid=true (set by Fix 2 in the API)
        // and show the success UI with the real PDF download button.
        if (cvId) {
          window.location.href = `/payment/return?cv_id=${cvId}`
        } else {
          toast.info("Ce CV a déjà été payé.")
          onAlreadyPaid()
          onClose()
        }
        return
      }

      if (data.checkout_url) {
        // Ouvrir Chariow dans un nouvel onglet — l'éditeur reste intact
        window.open(data.checkout_url, '_blank', 'noopener,noreferrer')
        // Remonter l'info au parent pour démarrer le polling
        if (onPaymentInitiated && cvId) {
          onPaymentInitiated(cvId)
        }
        // Fermer le modal
        onClose()
        return
      }

      throw new Error("Erreur inattendue")

    } catch (error) {
      console.error("Payment error:", error)
      setErrorMessage(error instanceof Error ? error.message : "Une erreur est survenue")
      setStep('error')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {step === 'form' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl">Téléchargez votre CV sans filigrane</DialogTitle>
              <DialogDescription>
                Payez 500 FCFA une seule fois pour obtenir votre CV en haute qualité
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom*</Label>
                  <Input 
                    id="firstName" 
                    name="firstName" 
                    required 
                    value={formData.firstName} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom*</Label>
                  <Input 
                    id="lastName" 
                    name="lastName" 
                    required 
                    value={formData.lastName} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone*</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  type="tel" 
                  placeholder="07XXXXXXXX" 
                  required 
                  value={formData.phone} 
                  onChange={handleChange} 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="countryCode">Pays*</Label>
                <Select 
                  value={formData.countryCode} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, countryCode: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un pays" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map(c => (
                      <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 space-y-3">
                <Button type="submit" className="w-full bg-[#6C63FF] hover:bg-[#5a52d4] font-semibold text-white shadow-lg shadow-primary/20 h-10">
                  💳 Payer 500 FCFA et télécharger
                </Button>
                <p className="text-[10px] text-center text-muted-foreground">
                  🔒 Paiement sécurisé via Chariow • Mobile Money & Cartes bancaires
                </p>
              </div>
            </form>
          </>
        )}

        {step === 'loading' && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="h-10 w-10 text-[#6C63FF] animate-spin" />
            <p className="text-sm font-medium text-center">Connexion au service de paiement...</p>
          </div>
        )}

        {step === 'error' && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h3 className="text-lg font-bold">Le paiement a échoué</h3>
            <p className="text-sm text-center text-muted-foreground mb-4">
              {errorMessage}
            </p>
            <Button onClick={() => setStep('form')} variant="outline">
              Réessayer
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
