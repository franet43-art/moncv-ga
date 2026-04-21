"use client"

import { useCVStore } from "@/store/cv-store"
import { CVViewerContent } from "@/components/templates/CVViewerContent"

export function CVPreview() {
  const { currentCV } = useCVStore()
  
  if (!currentCV) return null

  return (
    <div className="bg-white shadow-2xl mx-auto w-[210mm] max-w-full overflow-hidden">
      <CVViewerContent 
        content={currentCV.content} 
        settings={currentCV.settings} 
        isPaid={currentCV.isPaid} 
      />
    </div>
  )
}
