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

    // Always return 200 immediately
    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    console.error('Webhook processing error:', error)
    // Even on error, we should return 200 so Chariow doesn't keep retrying excessively if it's our bug,
    // though standard practice can be 500 to retry. The prompt asks to return 200 OK immediately for the success path,
    // we'll format a 500 here just in case of unhandled JSON mapping.
    return NextResponse.json({ error: 'Webhook Error' }, { status: 500 })
  }
}
