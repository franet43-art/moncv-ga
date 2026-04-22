import { requireAuth } from "@/lib/supabase/guards"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import EditorLoader from "./editor-loader"

export default async function EditCVPage({ params }: { params: Promise<{ id: string }> }) {
  const user = await requireAuth()
  const { id } = await params
  
  const supabase = await createServerSupabaseClient()
  const { data: cvData, error } = await supabase
    .from("cvs")
    .select("*")
    .eq("id", id)
    .single()
    
  if (error || !cvData || cvData.user_id !== user.id) {
    redirect("/dashboard")
  }
  
  return <EditorLoader cvData={cvData} cvId={id} />
}
