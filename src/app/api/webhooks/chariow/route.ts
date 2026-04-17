import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    if (payload.event === 'successful.sale') {
      const cvId = payload.sale?.custom_metadata?.cv_id
      const saleId = payload.sale?.id
      const amount = payload.sale?.amount?.value
      const currency = payload.sale?.amount?.currency

      if (cvId && saleId) {
        const supabaseAdmin = createAdminClient()

        // Idempotence check: skip if this sale was already processed
        const { data: existingPayment } = await supabaseAdmin
          .from('payments')
          .select('id')
          .eq('provider_ref', saleId)
          .maybeSingle()

        if (existingPayment) {
          // Already processed — return 200 silently
          return NextResponse.json({ received: true, duplicate: true }, { status: 200 })
        }

        // Extract user_id from CV
        const { data: cv } = await supabaseAdmin
          .from('cvs')
          .select('user_id')
          .eq('id', cvId)
          .single()
        
        if (cv) {
          // Update CV status
          await supabaseAdmin
            .from('cvs')
            .update({ is_paid: true })
            .eq('id', cvId)

          // Insert payment record
          await supabaseAdmin
            .from('payments')
            .insert({
              cv_id: cvId,
              user_id: cv.user_id,
              amount: amount || 500,
              currency: currency || 'XAF',
              status: 'completed',
              provider: 'chariow',
              provider_ref: saleId
            })
        }
      }
    }

    // Always return 200 immediately — Chariow expects acknowledgement
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook processing error:', error)
    // Even on error, return 200 to prevent Chariow from retrying indefinitely
    return NextResponse.json({ received: true, error: 'internal' }, { status: 200 })
  }
}
