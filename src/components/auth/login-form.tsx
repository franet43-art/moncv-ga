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
import { toast } from "sonner"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const successMsg = searchParams.get('message')
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  })

  const validate = () => {
    let isValid = true
    const newErrors = { email: "", password: "" }

    if (!email) {
      newErrors.email = "L'adresse email est requise"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Format d'email invalide"
      isValid = false
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis"
      isValid = false
    } else if (password.length < 6) {
      newErrors.password = "Le mot de passe doit faire au moins 6 caractères"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    
    if (!validate()) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        if (signInError.message === "Invalid login credentials") {
          setError("Email ou mot de passe incorrect")
        } else {
          setError("Une erreur est survenue, réessayez")
        }
        return
      }

      toast.success("Connexion réussie")
      const next = searchParams.get('next') || "/dashboard"
      router.push(next)
      router.refresh()
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
        <CardTitle className="text-2xl font-bold">Bon retour !</CardTitle>
        <p className="text-sm text-muted-foreground">
          Connectez-vous pour continuer à créer votre CV pro.
        </p>
      </CardHeader>
      <CardContent>
        {successMsg && (
          <div className="mb-4 p-3 rounded-md bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm font-medium border border-green-100 dark:border-green-900/30">
            {successMsg}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 rounded-md bg-destructive/10 text-destructive text-sm font-medium flex items-center gap-2 border border-destructive/20 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-[#6C63FF]"}
              disabled={isLoading}
            />
            {errors.email && <p className="text-[11px] font-medium text-destructive">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-[#6C63FF] transition-colors cursor-not-allowed"
                disabled
              >
                Mot de passe oublié ?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-[#6C63FF]"}
              disabled={isLoading}
            />
            {errors.password && <p className="text-[11px] font-medium text-destructive">{errors.password}</p>}
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#6C63FF] hover:bg-[#5a52d4] text-white font-semibold transition-all shadow-lg shadow-primary/20" 
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 pb-8">
        <div className="text-sm text-center text-muted-foreground">
          Pas encore de compte ?{" "}
          <Link href="/signup" className="text-[#6C63FF] font-semibold hover:underline">
            Créer un compte
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
