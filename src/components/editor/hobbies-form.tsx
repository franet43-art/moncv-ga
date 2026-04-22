"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Trash2, Heart } from "lucide-react"

import { hobbySchema, type Hobby } from "@/types/cv"
import { useCVStore } from "@/store/cv-store"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

function HobbyItemForm({ 
  hobby, 
  onRemove 
}: { 
  hobby: Hobby; 
  onRemove: () => void;
}) {
  const { updateHobby } = useCVStore()
  
  const form = useForm<Hobby>({
    resolver: zodResolver(hobbySchema) as any,
    defaultValues: hobby,
    mode: "onChange",
  })

  useEffect(() => {
    const subscription = form.watch((value) => {
      updateHobby(hobby.id, value as Partial<Hobby>)
    })
    return () => subscription.unsubscribe()
  }, [form, updateHobby, hobby.id])

  return (
    <Card className="relative overflow-hidden mb-3">
      <CardContent className="p-4 flex items-center gap-4">
        <Form {...form}>
          <form className="flex-1 flex items-center gap-4" onSubmit={(e) => e.preventDefault()}>
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="flex-1 space-y-0">
                <FormControl><Input placeholder="Photographie, Lecture, Voyages..." className="h-9" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </form>
        </Form>
        <Button 
          type="button" 
          variant="ghost" 
          size="icon" 
          onClick={onRemove}
          className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

export function HobbiesForm() {
  const { currentCV, addHobby, removeHobby } = useCVStore()
  const hobbiesList = currentCV.content.hobbies || []

  const handleAddHobby = () => {
    addHobby({
      id: crypto.randomUUID(),
      name: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Loisirs & Intérêts</h2>
          <p className="text-muted-foreground">
            Partagez vos passions pour rendre votre CV plus humain.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {hobbiesList.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed rounded-lg bg-zinc-50 dark:bg-zinc-900/50">
            <Heart className="h-8 w-8 mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground mb-4">Aucun loisir ajouté.</p>
            <Button onClick={handleAddHobby} variant="secondary">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un centre d'intérêt
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hobbiesList.map((hobby) => (
              <HobbyItemForm 
                key={hobby.id} 
                hobby={hobby} 
                onRemove={() => removeHobby(hobby.id)} 
              />
            ))}
          </div>
        )}
      </div>

      {hobbiesList.length > 0 && (
        <Button onClick={handleAddHobby} className="w-full" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un autre loisir
        </Button>
      )}
    </div>
  )
}
