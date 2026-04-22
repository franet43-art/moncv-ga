"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Trophy } from "lucide-react"

import { accomplishmentSchema, type Accomplishment } from "@/types/cv"
import { useCVStore } from "@/store/cv-store"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function AccomplishmentItemForm({ 
  accomplishment, 
  onRemove 
}: { 
  accomplishment: Accomplishment; 
  onRemove: () => void;
}) {
  const { updateAccomplishment } = useCVStore()
  
  const form = useForm<Accomplishment>({
    resolver: zodResolver(accomplishmentSchema) as any,
    defaultValues: accomplishment,
    mode: "onChange",
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateAccomplishment(accomplishment.id, value as Partial<Accomplishment>)
    })
    return () => subscription.unsubscribe()
  }, [form, updateAccomplishment, accomplishment.id])

  return (
    <Card className="relative overflow-hidden mb-4">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
      <CardHeader className="pt-4 pb-2 px-6 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">
            {form.watch("title") || "Nouvel Accomplissement"} 
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
              <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Titre de l'accomplissement <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Lauréat du concours X / Publication de l'article Y" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem>
                  <FormLabel>Date <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Mars 2023" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez brièvement votre succès ou votre distinction..." 
                      className="resize-none"
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

export function AccomplishmentsForm() {
  const { currentCV, addAccomplishment, removeAccomplishment } = useCVStore()
  const accomplishmentsList = currentCV.content.accomplishments || []

  const handleAddAccomplishment = () => {
    addAccomplishment({
      id: crypto.randomUUID(),
      title: "",
      date: "",
      description: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Accomplissements</h2>
          <p className="text-muted-foreground">
            Mettez en avant vos prix, distinctions ou projets notables.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {accomplishmentsList.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <Trophy className="h-8 w-8 mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground mb-4">Aucun accomplissement ajouté pour le moment.</p>
            <Button onClick={handleAddAccomplishment} variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter mon premier succès
            </Button>
          </div>
        ) : (
          accomplishmentsList.map((acc) => (
            <AccomplishmentItemForm 
              key={acc.id} 
              accomplishment={acc} 
              onRemove={() => removeAccomplishment(acc.id)} 
            />
          ))
        )}
      </div>

      {accomplishmentsList.length > 0 && (
        <Button onClick={handleAddAccomplishment} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un autre accomplissement
        </Button>
      )}
    </div>
  )
}
