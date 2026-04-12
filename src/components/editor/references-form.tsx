"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, UserCheck } from "lucide-react"

import { referenceSchema, type Reference } from "@/types/cv"
import { useCVStore } from "@/store/cv-store"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function ReferenceItemForm({ 
  reference, 
  onRemove 
}: { 
  reference: Reference; 
  onRemove: () => void;
}) {
  const { updateReference } = useCVStore()
  
  const form = useForm<Reference>({
    resolver: zodResolver(referenceSchema) as any,
    defaultValues: reference,
    mode: "onChange",
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateReference(reference.id, value as Partial<Reference>)
    })
    return () => subscription.unsubscribe()
  }, [form, updateReference, reference.id])

  return (
    <Card className="relative overflow-hidden mb-4">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
      <CardHeader className="pt-4 pb-2 px-6 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCheck className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">
            {form.watch("name") || "Nouvelle Référence"} 
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
                  <FormLabel>Nom <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="position" render={({ field }) => (
                <FormItem>
                  <FormLabel>Poste</FormLabel>
                  <FormControl><Input placeholder="Directrice RH" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem>
                  <FormLabel>Entreprise</FormLabel>
                  <FormControl><Input placeholder="Tech Solutions" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="jane@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl><Input type="tel" placeholder="+33 6 00 00 00 00" {...field} /></FormControl>
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

export function ReferencesForm() {
  const { currentCV, addReference, removeReference } = useCVStore()
  const referencesList = currentCV.content.references

  const handleAddReference = () => {
    addReference({
      id: crypto.randomUUID(),
      name: "",
      position: "",
      company: "",
      email: "",
      phone: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Références</h2>
          <p className="text-muted-foreground">
            Ajoutez des personnes pouvant recommander votre travail.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {referencesList.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <UserCheck className="h-8 w-8 mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground mb-4">Aucune référence ajoutée pour le moment.</p>
            <Button onClick={handleAddReference} variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter ma première référence
            </Button>
          </div>
        ) : (
          referencesList.map((ref) => (
            <ReferenceItemForm 
              key={ref.id} 
              reference={ref} 
              onRemove={() => removeReference(ref.id)} 
            />
          ))
        )}
      </div>

      {referencesList.length > 0 && (
        <Button onClick={handleAddReference} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une autre référence
        </Button>
      )}
    </div>
  )
}
