"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Languages } from "lucide-react"

import { languageSchema, type Language } from "@/types/cv"
import { useCVStore } from "@/store/cv-store"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

function LanguageItemForm({ 
  language, 
  onRemove 
}: { 
  language: Language; 
  onRemove: () => void;
}) {
  const { updateLanguage } = useCVStore()
  
  const form = useForm<Language>({
    resolver: zodResolver(languageSchema) as any,
    defaultValues: language,
    mode: "onChange",
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateLanguage(language.id, value as Partial<Language>)
    })
    return () => subscription.unsubscribe()
  }, [form, updateLanguage, language.id])

  return (
    <Card className="relative overflow-hidden mb-4">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/20" />
      <CardHeader className="pt-4 pb-2 px-6 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold">
            {form.watch("name") || "Nouvelle Langue"} 
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
                  <FormLabel>Langue <span className="text-destructive">*</span></FormLabel>
                  <FormControl><Input placeholder="Anglais" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="level" render={({ field }) => (
                <FormItem>
                  <FormLabel>Niveau <span className="text-destructive">*</span></FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre niveau" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="basique">Basique</SelectItem>
                      <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                      <SelectItem value="courant">Courant</SelectItem>
                      <SelectItem value="bilingue">Bilingue</SelectItem>
                      <SelectItem value="natif">Natif</SelectItem>
                    </SelectContent>
                  </Select>
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

export function LanguagesForm() {
  const { currentCV, addLanguage, removeLanguage } = useCVStore()
  const languagesList = currentCV.content.languages

  const handleAddLanguage = () => {
    addLanguage({
      id: crypto.randomUUID(),
      name: "",
      level: "basique",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Langues</h2>
          <p className="text-muted-foreground">
            Listez les langues que vous maîtrisez.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {languagesList.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <Languages className="h-8 w-8 mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground mb-4">Aucune langue ajoutée pour le moment.</p>
            <Button onClick={handleAddLanguage} variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter ma première langue
            </Button>
          </div>
        ) : (
          languagesList.map((lang) => (
            <LanguageItemForm 
              key={lang.id} 
              language={lang} 
              onRemove={() => removeLanguage(lang.id)} 
            />
          ))
        )}
      </div>

      {languagesList.length > 0 && (
        <Button onClick={handleAddLanguage} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une autre langue
        </Button>
      )}
    </div>
  )
}
