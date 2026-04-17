"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"

export function SignupForm() {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const validate = () => {
    let isValid = true
    const newErrors = { fullName: "", email: "", password: "", confirmPassword: "" }

    if (!formData.fullName) {
      newErrors.fullName = "Le nom complet est requis"
      isValid = false
    } else if (formData.fullName.length < 2) {
      newErrors.fullName = "Le nom est trop court"
      isValid = false
    }

    if (!formData.email) {
      newErrors.email = "L'adresse email est requise"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format d'email invalide"
      isValid = false
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Minimum 6 caractères"
      isValid = false
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!validate()) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        if (signUpError.message === "User already registered") {
          setError("Un compte existe déjà avec cet email")
        } else {
          setError("Une erreur est survenue, réessayez")
        }
        return
      }

      // Success - redirect to login with a message
      router.push("/login?message=Compte créé ! Connectez-vous.")
    } catch (err) {
      setError("Une erreur inattendue est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-zinc-200 dark:border-zinc-800 shadow-xl">
      <CardHeader className="space-y-1 pb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#6C63FF] flex items-center justify-center text-white font-bold text-xl">M</div>
            <span className="text-xl font-bold tracking-tight">MonCV.ga</span>
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
        <p className="text-sm text-muted-foreground">
          Commencez à créer des CV percutants gratuitement.
        </p>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium flex items-center gap-2 border border-destructive/20 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <Input
              id="fullName"
              placeholder="Ex: Jean Dupont"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-[#6C63FF]"}
              disabled={isLoading}
            />
            {errors.fullName && <p className="text-[11px] font-medium text-destructive">{errors.fullName}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-[#6C63FF]"}
              disabled={isLoading}
            />
            {errors.email && <p className="text-[11px] font-medium text-destructive">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-[#6C63FF]"}
                disabled={isLoading}
              />
              {errors.password && <p className="text-[11px] font-medium text-destructive">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-[#6C63FF]"}
                disabled={isLoading}
              />
              {errors.confirmPassword && <p className="text-[11px] font-medium text-destructive">{errors.confirmPassword}</p>}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#6C63FF] hover:bg-[#5a52d4] text-white font-semibold transition-all shadow-lg shadow-primary/20 mt-2" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Création...
              </>
            ) : (
              "S'inscrire"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pb-8">
        <div className="text-sm text-center text-muted-foreground">
          Déjà un compte ?{" "}
          <Link href="/login" className="text-[#6C63FF] font-semibold hover:underline">
            Se connecter
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
