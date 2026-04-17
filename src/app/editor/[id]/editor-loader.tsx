"use client"

import { useEffect, useState } from "react"
import { useCVStore } from "@/store/cv-store"
import NewEditorPage from "@/app/editor/new/page"
import type { CVRecord } from "@/types/database"

export default function EditorLoader({ cvData, cvId }: { cvData: CVRecord, cvId: string }) {
  const { setFromSupabase } = useCVStore()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setFromSupabase({
      id: cvData.id,
      title: cvData.title,
      content: cvData.content as any,
      settings: cvData.settings as any,
      isPaid: cvData.is_paid,
      userId: cvData.user_id,
      createdAt: cvData.created_at,
      updatedAt: cvData.updated_at
    })
    setReady(true)
  }, [cvData, setFromSupabase])

  if (!ready) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm font-medium text-muted-foreground">Hydratation de votre CV...</p>
        </div>
      </div>
    )
  }

  // Passing cvId correctly to the shared page UI
  return <NewEditorPage initialCvId={cvId} />
}
