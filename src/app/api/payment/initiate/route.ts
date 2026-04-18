import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      cvId, 
      customerEmail, 
      customerFirstName, 
      customerLastName, 
      customerPhone, 
      customerCountryCode 
    } = body;

    console.log('[PAYMENT_INITIATE] Démarrage pour cvId:', cvId);

    if (!cvId || !customerEmail || !customerFirstName) {
       return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error('[PAYMENT_INITIATE_AUTH_ERROR]', authError);
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Verify CV ownership
    const { data: cv, error: cvError } = await supabase
      .from('cvs')
      .select('user_id, is_paid')
      .eq('id', cvId)
      .single();

    if (cvError || !cv) {
      console.error('[PAYMENT_INITIATE_CV_ERROR]', cvError);
      return NextResponse.json({ error: 'CV non trouvé' }, { status: 404 });
    }

    if (cv.user_id !== user.id) {
      return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
    }

    if (cv.is_paid) {
      return NextResponse.json({ already_paid: true });
    }

    const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://moncv.ga';

    // Call Chariow API
    const chariowPayload: any = {
      product_id: process.env.CHARIOW_PRODUCT_ID,
      email: customerEmail,
      first_name: customerFirstName,
      last_name: customerLastName,
      redirect_url: `${NEXT_PUBLIC_APP_URL}/payment/return?cv_id=${cvId}&sale_id={sale_id}`,
      custom_metadata: {
        cv_id: cvId
      }
    };

    if (customerPhone || customerCountryCode) {
      chariowPayload.phone = {};
      if (customerPhone) chariowPayload.phone.number = customerPhone;
      if (customerCountryCode) chariowPayload.phone.country_code = customerCountryCode;
    }

    console.log('[PAYMENT_INITIATE] Appel API Chariow...');
    const chariowApiReq = await fetch('https://api.chariow.com/v1/checkout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CHARIOW_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chariowPayload)
    });

    const chariowRes = await chariowApiReq.json().catch(() => ({}));

    // LOG OBLIGATOIRE - voir la vraie réponse Chariow
    console.log('[PAYMENT_INITIATE] Chariow status:', chariowApiReq.status);
    console.log('[PAYMENT_INITIATE] Chariow response:', JSON.stringify(chariowRes));

    if (!chariowApiReq.ok) {
      console.error('[PAYMENT_INITIATE_CHARIOW_ERROR]', {
        status: chariowApiReq.status,
        response: chariowRes
      });
      return NextResponse.json({ 
        error: "Erreur lors de l'initiation du paiement", 
        details: chariowRes?.message || 'Erreur API Chariow'
      }, { status: 500 });
    }

    // Chercher checkout_url dans TOUTES les structures possibles
    const resData = chariowRes?.data || chariowRes;
    const checkoutUrl = 
      resData?.payment?.checkout_url ||   // structure actuelle attendue
      resData?.checkout_url ||             // structure directe
      resData?.url ||                      // variante possible
      chariowRes?.checkout_url;           // racine directe

    const step = resData?.step;

    console.log('[PAYMENT_INITIATE] step:', step, '| checkout_url trouvée:', !!checkoutUrl);

    if (checkoutUrl) {
      return NextResponse.json({ checkout_url: checkoutUrl });
    }

    if (step === 'completed' || step === 'already_purchased' || resData?.already_paid) {
      // Mark as paid if completed
      if (step === 'completed' || resData?.step === 'completed') {
        const { error: updateError } = await supabase
          .from('cvs')
          .update({ is_paid: true })
          .eq('id', cvId)
          .eq('user_id', user.id);

        if (updateError) {
          console.error('[PAYMENT_INITIATE_UPDATE_ERROR]', updateError);
        }
      }

      return NextResponse.json({ already_paid: true });
    }

    // Aucune structure connue — retourner toute la réponse pour debug
    console.error('[PAYMENT_INITIATE_UNKNOWN_STRUCTURE]', JSON.stringify(chariowRes));
    return NextResponse.json({ 
      error: 'Structure de réponse Chariow inconnue', 
      debug: chariowRes  // temporaire pour identifier la vraie structure
    }, { status: 500 });

  } catch (error: any) {
    console.error('[PAYMENT_INITIATE_FATAL_ERROR]', {
      message: error.message,
      stack: error.stack
    });
    return NextResponse.json({ 
      error: 'Erreur serveur interne', 
      details: error.message 
    }, { status: 500 });
  }
}
