import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer-core'

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

    // Encoder les données CV en base64 pour l'URL
    const encodedData = Buffer.from(
      JSON.stringify({ content, settings, isPaid })
    ).toString('base64')

    const targetUrl = `${BASE_URL}/pdf-viewer?data=${encodedData}`

    // Connexion à Browserless.io (Chrome distant)
    browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${BROWSERLESS_TOKEN}`,
    })

    const page = await browser.newPage()

    // Largeur A4 exacte (794px = 210mm à 96dpi)
    await page.setViewport({ 
      width: 794, 
      height: 1123, 
      deviceScaleFactor: 1 
    })

    // Visiter la page de preview
    await page.goto(targetUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    // Attendre que les fonts soient chargées
    // (le script dans pdf-viewer met le title à 'PDF_READY')
    try {
      await page.waitForFunction(
        'document.title === "PDF_READY"',
        { timeout: 5000 }
      )
    } catch {
      // Si timeout, on continue quand même
      await new Promise(r => setTimeout(r, 1000))
    }

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      preferCSSPageSize: true,
    })

    await browser.disconnect()

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
