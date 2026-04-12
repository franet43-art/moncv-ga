"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, GraduationCap } from "lucide-react"

import { educationSchema, type Education } from "@/types/cv"
import { useCVStore } from "@/store/cv-store"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function EducationItemForm({ 
  education, 
  onRemove 
}: { 
  education: Education; 
  onRemove: () => void;
}) {
  const { updateEducation } = useCVStore()
  
  const form = useForm<Education>({
    resolver: zodResolver(educationSchema) as any,
    defaultValues: education,
    mode: "onChange",
  })

  const isCurrent = form.watch("isCurrent")

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateEducation(education.id, value as Partial<Education>)
    })
    return () => subscription.unsubscribe()
  }, [form, updateEducation, education.id])

  return (
    <Card className="relative overflow-hidden mb-4">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
      <CardHeader className="pt-4 pb-2 px-6 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">
            {form.watch("institution") || "Nouvel Établissement"} 
            {form.watch("degree") ? ` - ${form.watch("degree")}` : ""}
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
              <FormField control={form.control} name="institution" render={({ field }) => (
                <FormItem>
                  <FormLabel>Établissement <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Université de Paris" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="degree" render={({ field }) => (
                <FormItem>
                  <FormLabel>Diplôme <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Master en Informatique" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="field" render={({ field }) => (
                <FormItem>
                  <FormLabel>Domaine d'étude</FormLabel>
                  <FormControl><Input placeholder="Génie Logiciel" {...field} /></FormControl>
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
                      <FormLabel>Études en cours</FormLabel>
                    </div>
                  </FormItem>
                )} />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export function EducationForm() {
  const { currentCV, addEducation, removeEducation } = useCVStore()
  const educationList = currentCV.content.education

  const handleAddEducation = () => {
    addEducation({
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Formation</h2>
          <p className="text-muted-foreground">
            Détaillez vos diplômes et certifications.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {educationList.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <GraduationCap className="h-8 w-8 mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground mb-4">Aucune formation ajoutée pour le moment.</p>
            <Button onClick={handleAddEducation} variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter ma première formation
            </Button>
          </div>
        ) : (
          educationList.map((edu) => (
            <EducationItemForm 
              key={edu.id} 
              education={edu} 
              onRemove={() => removeEducation(edu.id)} 
            />
          ))
        )}
      </div>

      {educationList.length > 0 && (
        <Button onClick={handleAddEducation} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une autre formation
        </Button>
      )}
    </div>
  )
}
