"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Sparkles, Building2 } from "lucide-react"

import { experienceSchema, type Experience } from "@/types/cv"
import { useCVStore } from "@/store/cv-store"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function ExperienceItemForm({ 
  experience, 
  onRemove 
}: { 
  experience: Experience; 
  onRemove: () => void;
}) {
  const { updateExperience } = useCVStore()
  
  const form = useForm<Experience>({
    resolver: zodResolver(experienceSchema) as any,
    defaultValues: experience,
    mode: "onChange",
  })

  const isCurrent = form.watch("isCurrent")

  useEffect(() => {
    const subscription = form.watch((value) => {
      // Cast to Partial to avoid type conflicts on optional fields during typing
      updateExperience(experience.id, value as Partial<Experience>)
    })
    return () => subscription.unsubscribe()
  }, [form, updateExperience, experience.id])

  return (
    <Card className="relative overflow-hidden mb-4">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
      <CardHeader className="pt-4 pb-2 px-6 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">
            {form.watch("company") || "Nouvelle Entreprise"} 
            {form.watch("position") ? ` - ${form.watch("position")}` : ""}
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
              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem>
                  <FormLabel>Enterprise <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Google" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="position" render={({ field }) => (
                <FormItem>
                  <FormLabel>Poste <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Senior Developer" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="startDate" render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de début <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input type="month" placeholder="YYYY-MM" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="space-y-4">
                <FormField control={form.control} name="endDate" render={({ field }) => (
                  <FormItem>
                    <FormLabel className={isCurrent ? "text-muted-foreground" : ""}>Date de fin</FormLabel>
                    <FormControl>
                      <Input 
                        type="month" 
                        placeholder="YYYY-MM" 
                        {...field} 
                        value={field.value || ""} 
                        disabled={isCurrent} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="isCurrent" render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2 rounded-md border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 mt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Poste actuel</FormLabel>
                    </div>
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>Description des tâches</FormLabel>
                    <Button type="button" variant="ghost" size="sm" className="h-8 text-xs font-semibold text-primary">
                      <Sparkles className="h-3 w-3 mr-1" /> Enhance with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez vos réalisations (utilisez des listes à puces pour plus d'impact)..." 
                      className="resize-none h-32" 
                      {...field} 
                    />
                  </FormControl>
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

export function ExperienceForm() {
  const { currentCV, addExperience, removeExperience } = useCVStore()
  const experiences = currentCV.content.experiences

  const handleAddExperience = () => {
    addExperience({
      id: crypto.randomUUID(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Expérience</h2>
          <p className="text-muted-foreground">
            Détaillez vos expériences professionnelles de manière chronologique.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <Building2 className="h-8 w-8 mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground mb-4">Aucune expérience ajoutée pour le moment.</p>
            <Button onClick={handleAddExperience} variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter ma première expérience
            </Button>
          </div>
        ) : (
          experiences.map((exp) => (
            <ExperienceItemForm 
              key={exp.id} 
              experience={exp} 
              onRemove={() => removeExperience(exp.id)} 
            />
          ))
        )}
      </div>

      {experiences.length > 0 && (
        <Button onClick={handleAddExperience} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une autre expérience
        </Button>
      )}
    </div>
  )
}
