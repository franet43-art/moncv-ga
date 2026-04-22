import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

const BROWSERLESS_TOKEN = process.env.BROWSERLESS_TOKEN
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://moncv-ga.vercel.app'

export async function POST(req: NextRequest) {
  let browser = null
  try {
    const body = await req.json()
    const { content, settings, isPaid } = body

    if (!content?.personalInfo) {
      return NextResponse.json({ error: 'Données CV invalides' }, { status: 400 })
    }

    if (!BROWSERLESS_TOKEN) {
      return NextResponse.json({ error: 'Service PDF non configuré' }, { status: 500 })
    }

    // 1. Stocker les données dans Supabase
    const supabase = await createServerSupabaseClient()
    const { data: job, error: insertError } = await supabase
      .from('pdf_jobs')
      .insert({ 
        content, 
        settings, 
        is_paid: isPaid ?? false 
      })
      .select('id')
      .single()

    if (insertError || !job) {
      console.error('[PDF] Supabase insert error:', insertError)
      return NextResponse.json({ error: 'Erreur stockage données' }, { status: 500 })
    }

    // 2. URL courte avec juste l'UUID
    const targetUrl = `${BASE_URL}/pdf-viewer?jobId=${job.id}`

    // 3. Connexion Browserless
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_TOKEN}`,
    })

    const page = await browser.newPage()
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 })

    await page.goto(targetUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    // 4. Attendre que le CV soit visible
    await page.waitForSelector('#cv-root', { timeout: 10000 })

    // Attendre les fonts
    await page.evaluate(() => document.fonts.ready)

    // Buffer supplémentaire pour les images
    await new Promise(r => setTimeout(r, 500))

    // 5. Générer PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
    })

    await browser.disconnect()

    // 6. Nettoyer le job Supabase
    await supabase.from('pdf_jobs').delete().eq('id', job.id)

    const fileName = `CV-${content.personalInfo?.fullName || 'MonCV'}.pdf`

    return new NextResponse(pdfBuffer as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'no-store',
      },
    })

  } catch (error: any) {
    console.error('[PDF_ERROR]', error?.message)
    if (browser) {
      try { await browser.disconnect() } catch {}
    }
    return NextResponse.json(
      { error: error?.message || 'Erreur génération PDF' },
      { status: 500 }
    )
  }
}
