import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ cvId: string }> }
) {
  try {
    const { cvId } = await params  // IMPORTANT: params est une Promise en Next.js récent
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ is_paid: false }, { status: 401 })
    }

    const { data: cv } = await supabase
      .from('cvs')
      .select('is_paid')
      .eq('id', cvId)
      .eq('user_id', user.id)
      .single()

    return NextResponse.json({ is_paid: cv?.is_paid ?? false })
  } catch (error) {
    console.error('[CV_STATUS_ERROR]', error)
    return NextResponse.json({ is_paid: false })
  }
}
