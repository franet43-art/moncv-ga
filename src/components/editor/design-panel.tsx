"use client"

import { useCVStore } from "@/store/cv-store"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Pipette } from "lucide-react"
import { cn } from "@/lib/utils"

const ACCENT_COLORS = [
  "#6C63FF", // Violet original
  "#E53E3E", // Rouge
  "#38A169", // Vert
  "#3182CE", // Bleu
  "#D69E2E", // Jaune/Or
  "#805AD5", // Violet foncé
  "#DD6B20", // Orange
  "#2D3748", // Noir/Gris foncé
]

const FONTS = [
  { id: "inter", name: "Inter", desc: "Moderne & Pro", family: "Inter, sans-serif" },
  { id: "merriweather", name: "Merriweather", desc: "Élégant & Serif", family: "Merriweather, serif" },
  { id: "playfair", name: "Playfair Display", desc: "Stylé & Artistique", family: "'Playfair Display', serif" },
  { id: "roboto", name: "Roboto", desc: "Neutre & Clair", family: "Roboto, sans-serif" },
]

export function DesignPanel() {
  const { currentCV, updateSettings } = useCVStore()
  const { settings } = currentCV

  return (
    <div className="space-y-10 py-4 animate-in fade-in slide-in-from-bottom-2">
      {/* 1. Modèles */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold tracking-tight">Modèle de CV</h3>
          <p className="text-sm text-muted-foreground">Choisissez la mise en page qui vous correspond.</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {[
            { id: "classic", name: "Classique", icon: "vertical" },
            { id: "modern", name: "Moderne", icon: "sidebar" },
            { id: "minimal", name: "Minimaliste", icon: "clean" },
          ].map((template) => (
            <button
              key={template.id}
              onClick={() => updateSettings({ templateId: template.id as any })}
              className={cn(
                "group relative flex flex-col items-center gap-3 p-3 rounded-xl border-2 transition-all hover:border-primary/50 bg-white dark:bg-zinc-900 shadow-sm",
                settings.templateId === template.id 
                  ? "border-primary ring-2 ring-primary/10" 
                  : "border-zinc-100 dark:border-zinc-800"
              )}
            >
              {/* Miniature SVG */}
              <div className="w-full aspect-[1/1.4] bg-zinc-50 dark:bg-zinc-950 rounded border border-zinc-100 dark:border-zinc-800 p-2 overflow-hidden">
                {template.id === "classic" && (
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
                    <div className="space-y-1">
                      <div className="h-1 w-full bg-zinc-100 dark:bg-zinc-900" />
                      <div className="h-1 w-4/5 bg-zinc-100 dark:bg-zinc-900" />
                    </div>
                    <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-900 flex flex-col gap-1">
                       <div className="h-1 w-full bg-zinc-200 dark:bg-zinc-800" />
                       <div className="h-1 w-1/2 bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                  </div>
                )}
                {template.id === "modern" && (
                  <div className="flex gap-2 h-full">
                    <div className="w-1/3 h-full bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-full bg-zinc-100 dark:bg-zinc-900" />
                      <div className="h-1 w-full bg-zinc-100/50" />
                      <div className="h-8 w-full bg-zinc-100/50" />
                    </div>
                  </div>
                )}
                {template.id === "minimal" && (
                  <div className="space-y-4 pt-4">
                    <div className="h-2 w-1/2 mx-auto bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
                    <div className="h-px w-full bg-zinc-100 dark:bg-zinc-900" />
                    <div className="space-y-2">
                       <div className="h-1 w-full bg-zinc-100/50" />
                       <div className="h-1 w-full bg-zinc-100/50" />
                       <div className="h-1 w-3/4 bg-zinc-100/50" />
                    </div>
                  </div>
                )}
              </div>
              
              <span className="text-xs font-bold">{template.name}</span>
              
              {settings.templateId === template.id && (
                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5 shadow-sm">
                  <Check className="h-3 w-3" />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 2. Couleur d'accent */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-lg font-bold tracking-tight">Couleur d'accent</h3>
          <p className="text-sm text-muted-foreground">La couleur utilisée pour les titres et éléments visuels.</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateSettings({ accentColor: color })}
              className={cn(
                "w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 shadow-sm flex items-center justify-center",
                settings.accentColor === color ? "border-zinc-950 dark:border-white ring-2 ring-primary/20 scale-110" : "border-transparent"
              )}
              style={{ backgroundColor: color }}
            >
              {settings.accentColor === color && (
                <Check className="h-5 w-5 text-white mix-blend-difference" />
              )}
            </button>
          ))}
          
          <div className="relative group flex items-center gap-3 ml-2 pl-4 border-l border-zinc-200 dark:border-zinc-800">
             <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-100 dark:border-zinc-800 hover:border-primary transition-colors cursor-pointer group shadow-sm">
                <Input 
                  type="color" 
                  value={settings.accentColor}
                  onChange={(e) => updateSettings({ accentColor: e.target.value })}
                  className="absolute -inset-2 w-14 h-14 p-0 border-none cursor-pointer"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-white mix-blend-difference">
                  <Pipette className="h-4 w-4" />
                </div>
             </div>
             <span className="text-xs font-medium text-muted-foreground group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">Sur mesure</span>
          </div>
        </div>
      </section>

      {/* 3. Police */}
      <section className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-bold tracking-tight">Police d'écriture</h3>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {FONTS.map((font) => (
            <button
              key={font.id}
              onClick={() => updateSettings({ fontFamily: font.id as any })}
              className={cn(
                "flex flex-col items-start gap-0.5 p-4 rounded-xl border-2 text-left transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
                settings.fontFamily === font.id 
                  ? "border-primary bg-primary/[0.02] ring-2 ring-primary/5" 
                  : "border-zinc-100 dark:border-zinc-800"
              )}
            >
              <span className="text-base font-medium" style={{ fontFamily: font.family }}>{font.name}</span>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{font.desc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Taille du texte */}
      <section className="space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-bold tracking-tight">Taille du texte</h3>
        </div>

        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-lg w-fit">
          {[
            { id: "small", name: "Petit" },
            { id: "medium", name: "Moyen" },
            { id: "large", name: "Grand" },
          ].map((size) => (
            <button
              key={size.id}
              onClick={() => updateSettings({ fontSize: size.id as any })}
              className={cn(
                "px-6 py-2 rounded-md font-medium text-sm transition-all",
                settings.fontSize === size.id 
                  ? "bg-white dark:bg-zinc-800 shadow-sm text-zinc-900 dark:text-zinc-100" 
                  : "text-muted-foreground hover:text-zinc-600 dark:hover:text-zinc-300"
              )}
            >
              {size.name}
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}
