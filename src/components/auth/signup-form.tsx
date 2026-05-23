"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Loader2, AlertCircle } from "lucide-react"

/** Sanitize the `next` redirect to prevent open-redirect attacks. */
function sanitizeNext(next: string | null): string {
  if (!next || !next.startsWith('/') || next.includes('://')) return '/dashboard'
  return next
}

export function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState(false)
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
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
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

  const handleOAuthSignup = async () => {
    setOauthLoading(true)
    setError(null)
    const supabase = createClient()
    const next = sanitizeNext(searchParams.get('next'))

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${next}`,
      },
    })

    if (oauthError) {
      setError("Erreur de connexion avec Google, réessayez")
      setOauthLoading(false)
    }
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
      router.push("/login?message=compte-cree")
    } catch (err) {
      setError("Une erreur inattendue est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  const anyLoading = isLoading || oauthLoading

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

        {/* ── Google OAuth ── */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 font-medium mb-2 gap-3 text-sm"
          onClick={handleOAuthSignup}
          disabled={anyLoading}
        >
          {oauthLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          )}
          S'inscrire avec Google
        </Button>

        {/* ── Divider ── */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              ou par email
            </span>
          </div>
        </div>

        {/* ── Email / Password form (inchangé) ── */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <Input
              id="fullName"
              placeholder="Ex: Jean Dupont"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-[#6C63FF]"}
              disabled={anyLoading}
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
              disabled={anyLoading}
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
                disabled={anyLoading}
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
                disabled={anyLoading}
              />
              {errors.confirmPassword && <p className="text-[11px] font-medium text-destructive">{errors.confirmPassword}</p>}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#6C63FF] hover:bg-[#5a52d4] text-white font-semibold transition-all shadow-lg shadow-primary/20 mt-2" 
            disabled={anyLoading}
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
