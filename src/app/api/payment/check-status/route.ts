import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const cvId = searchParams.get('cv_id')

    if (!cvId) {
      return NextResponse.json({ error: 'cv_id manquant' }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { data: cv, error: cvError } = await supabase
      .from('cvs')
      .select('user_id, is_paid')
      .eq('id', cvId)
      .single()

    if (cvError || !cv) {
      return NextResponse.json({ error: 'CV non trouvé' }, { status: 404 })
    }

    if (cv.user_id !== user.id) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
    }

    return NextResponse.json({ is_paid: cv.is_paid })

  } catch (error) {
    console.error('Check status error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
