"use client"

import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Sparkles, UserCircle, X, Camera } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { enhanceSummary } from "@/lib/api/enhance"
import { Loader2 } from "lucide-react"

import { personalInfoSchema, type PersonalInfo } from "@/types/cv"
import { useCVStore } from "@/store/cv-store"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function PersonalInfoForm() {
  const { currentCV, updatePersonalInfo, setPhoto, removePhoto } = useCVStore()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isEnhancing, setIsEnhancing] = useState(false)
  
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: currentCV.content.personalInfo.fullName || "",
      jobTitle: currentCV.content.personalInfo.jobTitle || "",
      email: currentCV.content.personalInfo.email || "",
      phone: currentCV.content.personalInfo.phone || "",
      address: currentCV.content.personalInfo.address || "",
      linkedin: currentCV.content.personalInfo.linkedin || "",
      summary: currentCV.content.personalInfo.summary || "",
    },
    mode: "onChange",
  })

  // Synchronize React Hook Form state with Zustand store on every change
  useEffect(() => {
    const subscription = form.watch((value) => {
      updatePersonalInfo(value as Partial<PersonalInfo>)
    })
    return () => subscription.unsubscribe()
  }, [form, updatePersonalInfo])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement("canvas")
        let width = img.width
        let height = img.height

        // Resize to max 400x400
        const maxSize = 400
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width
            width = maxSize
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height
            height = maxSize
          }
        }

        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")
        ctx?.drawImage(img, 0, 0, width, height)

        // Initial export with 0.7 quality
        let quality = 0.7
        let base64 = canvas.toDataURL("image/jpeg", quality)

        // Check size (< 200KB approx 200000 chars in base64 is roughly 150KB)
        // More accurately size in bytes = base64.length * 0.75
        if (base64.length * 0.75 > 200000) {
          quality = 0.5
          base64 = canvas.toDataURL("image/jpeg", quality)
        }

        setPhoto(base64)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(file)
  }

  const userPhoto = currentCV.settings.photoUrl

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Informations Personnelles</h2>
          <p className="text-muted-foreground">
            Saisissez vos coordonnées de base et un résumé professionnel.
          </p>
        </div>

        {/* Photo Upload Section */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative group">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative w-32 h-32 rounded-full border-2 border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center overflow-hidden hover:border-primary transition-colors bg-zinc-50 dark:bg-zinc-900 shadow-sm"
            >
              {userPhoto ? (
                <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-zinc-400 group-hover:text-primary transition-colors">
                  <UserCircle className="h-12 w-12" />
                  <Camera className="h-4 w-4 absolute bottom-2" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </button>

            {userPhoto && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removePhoto()
                }}
                className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-1 shadow-md hover:scale-110 transition-transform"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Photo de profil</span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Jean Dupont" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Title */}
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poste recherché</FormLabel>
                  <FormControl>
                    <Input placeholder="Développeur Fullstack" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="jean.dupont@exemple.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+241 06 00 00 00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="Libreville, Gabon" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* LinkedIn */}
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>URL LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="https://linkedin.com/in/jeandupont" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>Résumé professionnel</FormLabel>
                    <Button disabled={isEnhancing}
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs font-semibold text-primary"
                      onClick={() => {
                        const currentSummary = form.getValues("summary") || ""
                        const jobTitle = form.getValues("jobTitle") || ""
                        const fullName = form.getValues("fullName") || ""

                        if (!currentSummary && !jobTitle) {
                          toast.error("Veuillez saisir un poste recherché ou un début de résumé.")
                          return
                        }

                        setIsEnhancing(true)
                        enhanceSummary(currentSummary, jobTitle, fullName)
                          .then((enhancedText) => {
                            form.setValue("summary", enhancedText)
                            updatePersonalInfo({ summary: enhancedText })
                            toast.success("Résumé amélioré avec succès !")
                          })
                          .catch((err) => {
                            toast.error(err.message || "Erreur lors de l'amélioration du résumé.")
                          })
                          .finally(() => setIsEnhancing(false))
                      }}
                    >
                      {isEnhancing ? <Loader2 className="h-3 w-3 mr-1 animate-spin" /> : <Sparkles className="h-3 w-3 mr-1" />}
                      {isEnhancing ? "Amélioration..." : "Améliorer avec l'IA"}
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea 
                      placeholder="Professionnel motivé avec une solide expérience en..." 
                      className="resize-none h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
