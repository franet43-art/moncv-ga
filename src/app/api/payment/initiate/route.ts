import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { 
      cvId, 
      customerEmail, 
      customerFirstName, 
      customerLastName, 
      customerPhone, 
      customerCountryCode 
    } = body

    if (!cvId || !customerEmail || !customerFirstName) {
       return NextResponse.json({ error: 'Données manquantes' }, { status: 400 })
    }

    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Verify CV ownership
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

    if (cv.is_paid) {
      return NextResponse.json({ already_paid: true })
    }

    const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://moncv.ga'

    // Call Chariow API
    const chariowPayload = {
      product_id: process.env.CHARIOW_PRODUCT_ID,
      email: customerEmail,
      first_name: customerFirstName,
      last_name: customerLastName,
      phone: {
        number: customerPhone || "",
        country_code: customerCountryCode || ""
      },
      redirect_url: `${NEXT_PUBLIC_APP_URL}/payment/return?cv_id=${cvId}&sale_id={sale_id}`,
      custom_metadata: {
        cv_id: cvId
      }
    }

    // Clean up empty phone data if not provided (depends on Chariow API requirement, assuming strings are fine)
    if (!customerPhone) delete (chariowPayload.phone as any).number;
    if (!customerCountryCode) delete (chariowPayload.phone as any).country_code;

    const chariowApiReq = await fetch('https://api.chariow.com/v1/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CHARIOW_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chariowPayload)
    })

    const chariowRes = await chariowApiReq.json()

    if (!chariowApiReq.ok) {
      console.error('Chariow error:', chariowRes)
      return NextResponse.json({ error: 'Erreur lors de l\'initiation du paiement' }, { status: 500 })
    }

    const resData = chariowRes.data || chariowRes

    if (resData.step === 'payment') {
      return NextResponse.json({ checkout_url: resData.payment?.checkout_url })
    }

    if (resData.step === 'completed') {
      // Free product or instant completion — mark as paid in DB so polling works
      const { error: updateError } = await supabase
        .from('cvs')
        .update({ is_paid: true })
        .eq('id', cvId)
        .eq('user_id', user.id) // extra safety guard

      if (updateError) {
        console.error('Failed to mark CV as paid:', updateError)
        // Non-blocking: still return success to frontend
      }

      return NextResponse.json({ already_paid: true })
    }

    if (resData.step === 'already_purchased') {
      return NextResponse.json({ already_paid: true })
    }

    console.error('Unexpected Chariow step:', resData.step, chariowRes)
    return NextResponse.json({ error: 'Statut de paiement inattendu' }, { status: 500 })

  } catch (error) {
    console.error('Payment initiate error:', error)
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 })
  }
}
