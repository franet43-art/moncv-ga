import { createClient } from '@/lib/supabase/client'
import type { CVRecord } from '@/types/database'
import type { CV } from '@/types/cv'

export async function saveCV(cvData: CV, cvId?: string | null): Promise<CVRecord> {
  const supabase = createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    throw new Error('Vous devez être connecté pour sauvegarder votre CV')
  }

  const title = cvData.content.personalInfo.fullName || 'Mon CV'
  
  if (cvId) {
    const { data, error } = await supabase
      .from('cvs')
      .update({
        content: cvData.content as Record<string, unknown>,
        settings: cvData.settings as Record<string, unknown>,
        title: title,
        updated_at: new Date().toISOString()
      })
      .eq('id', cvId)
      .eq('user_id', user.id)
      .select()
      .single()
      
    if (error) throw error
    return data as CVRecord
  } else {
    const { data, error } = await supabase
      .from('cvs')
      .insert({
        user_id: user.id,
        content: cvData.content as Record<string, unknown>,
        settings: cvData.settings as Record<string, unknown>,
        title: title,
        is_paid: false
      })
      .select()
      .single()
      
    if (error) throw error
    return data as CVRecord
  }
}

export async function loadCV(cvId: string): Promise<CVRecord> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('cvs')
    .select('*')
    .eq('id', cvId)
    .single()
    
  if (error) throw error
  return data as CVRecord
}

export async function listUserCVs(): Promise<CVRecord[]> {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    throw new Error('Vous devez être connecté pour voir vos CVs')
  }
  
  const { data, error } = await supabase
    .from('cvs')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })
    
  if (error) throw error
  return data as CVRecord[]
}

export async function deleteCV(cvId: string): Promise<void> {
  const supabase = createClient()
  const { error } = await supabase
    .from('cvs')
    .delete()
    .eq('id', cvId)
    
  if (error) throw error
}

export async function duplicateCV(cvId: string): Promise<CVRecord> {
  const supabase = createClient()
  const original = await loadCV(cvId)
  
  const { data, error } = await supabase
    .from('cvs')
    .insert({
      user_id: original.user_id,
      content: original.content,
      settings: original.settings,
      title: `${original.title} (copie)`,
      is_paid: false
    })
    .select()
    .single()
    
  if (error) throw error
  return data as CVRecord
}
