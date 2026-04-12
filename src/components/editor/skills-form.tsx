"use client"

import { useState } from "react"
import { Plus, X, Laptop } from "lucide-react"

import { type Skill } from "@/types/cv"
import { useCVStore } from "@/store/cv-store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export function SkillsForm() {
  const { currentCV, addSkill, removeSkill } = useCVStore()
  const skills = currentCV.content.skills

  const [newSkillName, setNewSkillName] = useState("")
  const [newSkillLevel, setNewSkillLevel] = useState<Skill["level"]>("debutant")

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return

    addSkill({
      id: crypto.randomUUID(),
      name: newSkillName.trim(),
      level: newSkillLevel,
    })

    setNewSkillName("")
    setNewSkillLevel("debutant")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSkill()
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Compétences</h2>
        <p className="text-muted-foreground">
          Ajoutez vos compétences techniques et professionnelles.
        </p>
      </div>

      <Card className="border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Ex: React, Gestion de projet, Design UI..."
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={newSkillLevel}
                onValueChange={(value) => setNewSkillLevel(value as Skill["level"])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debutant">Débutant</SelectItem>
                  <SelectItem value="intermediaire">Intermédiaire</SelectItem>
                  <SelectItem value="avance">Avancé</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="button" onClick={handleAddSkill} disabled={!newSkillName.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        {skills.length === 0 ? (
          <div className="w-full py-8 text-center border-2 border-dashed rounded-lg">
            <Laptop className="h-8 w-8 mx-auto text-muted-foreground mb-2 opacity-50" />
            <p className="text-sm text-muted-foreground">Aucune compétence ajoutée.</p>
          </div>
        ) : (
          skills.map((skill) => (
            <Badge
              key={skill.id}
              variant="secondary"
              className="pl-3 pr-1 py-1.5 flex items-center gap-2 text-sm bg-background border border-zinc-200 dark:border-zinc-800 transition-all hover:border-primary/50 group"
            >
              <div className="flex flex-col items-start leading-none gap-0.5">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">
                  {skill.level}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 rounded-full hover:bg-destructive hover:text-destructive-foreground opacity-50 group-hover:opacity-100 transition-opacity"
                onClick={() => removeSkill(skill.id)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Supprimer {skill.name}</span>
              </Button>
            </Badge>
          ))
        )}
      </div>
    </div>
  )
}
