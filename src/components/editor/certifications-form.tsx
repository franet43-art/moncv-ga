"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Medal, Link as LinkIcon } from "lucide-react"

import { certificationSchema, type Certification } from "@/types/cv"
import { useCVStore } from "@/store/cv-store"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function CertificationItemForm({ 
  certification, 
  onRemove 
}: { 
  certification: Certification; 
  onRemove: () => void;
}) {
  const { updateCertification } = useCVStore()
  
  const form = useForm<Certification>({
    resolver: zodResolver(certificationSchema) as any,
    defaultValues: certification,
    mode: "onChange",
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateCertification(certification.id, value as Partial<Certification>)
    })
    return () => subscription.unsubscribe()
  }, [form, updateCertification, certification.id])

  return (
    <Card className="relative overflow-hidden mb-4">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
      <CardHeader className="pt-4 pb-2 px-6 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Medal className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">
            {form.watch("name") || "Nouvelle Certification"} 
          </CardTitle>
        </div>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={onRemove}
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <Form {...form}>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la certification <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Google Data Analytics" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="issuer" render={({ field }) => (
                <FormItem>
                  <FormLabel>Organisme délivreur <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Coursera / Google" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'obtention <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Janvier 2024" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="url" render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    URL du certificat <LinkIcon className="h-3 w-3" />
                  </FormLabel>
                  <FormControl><Input placeholder="https://coursera.org/verify/..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export function CertificationsForm() {
  const { currentCV, addCertification, removeCertification } = useCVStore()
  const certificationsList = currentCV.content.certifications || []

  const handleAddCertification = () => {
    addCertification({
      id: crypto.randomUUID(),
      name: "",
      issuer: "",
      date: "",
      url: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Certifications</h2>
          <p className="text-muted-foreground">
            Ajoutez vos diplômes, certifications et badges académiques.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {certificationsList.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <Medal className="h-8 w-8 mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground mb-4">Aucune certification ajoutée pour le moment.</p>
            <Button onClick={handleAddCertification} variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter ma première certification
            </Button>
          </div>
        ) : (
          certificationsList.map((cert) => (
            <CertificationItemForm 
              key={cert.id} 
              certification={cert} 
              onRemove={() => removeCertification(cert.id)} 
            />
          ))
        )}
      </div>

      {certificationsList.length > 0 && (
        <Button onClick={handleAddCertification} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une autre certification
        </Button>
      )}
    </div>
  )
}
