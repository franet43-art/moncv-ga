import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { CVPDFDocument } from '@/components/pdf/pdf-document'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  let templateId: string | undefined
  let fullName: string | undefined

  try {
    const body = await req.json()
    const { content, settings, isPaid } = body

    templateId = settings?.templateId
    fullName = content?.personalInfo?.fullName

    console.log('[PDF_START] templateId:', templateId)
    console.log('[PDF_START] fullName:', fullName)
    console.log('[PDF_CONTENT_CHECK] hasPersonalInfo:', !!content?.personalInfo)
    console.log('[PDF_CONTENT_CHECK] hasEmail:', !!content?.personalInfo?.email)
    console.log('[PDF_CONTENT_CHECK] hasPhoto:', !!settings?.photoUrl)
    console.log('[PDF_CONTENT_CHECK] experiencesCount:', content?.experiences?.length ?? 0)
    console.log('[PDF_CONTENT_CHECK] educationCount:', content?.education?.length ?? 0)
    console.log('[PDF_CONTENT_CHECK] skillsCount:', content?.skills?.length ?? 0)
    console.log('[PDF_CONTENT_CHECK] languagesCount:', content?.languages?.length ?? 0)
    console.log('[PDF_CONTENT_CHECK] isPaid:', !!isPaid)

    if (!content?.personalInfo) {
      console.log('[PDF_REJECT] Données CV invalides — personalInfo manquant')
      return NextResponse.json({ error: 'Données CV invalides' }, { status: 400 })
    }

    console.log('[PDF_RENDER_START] Appel renderToBuffer...')

    const buffer = await renderToBuffer(
      React.createElement(CVPDFDocument, { content, settings, isPaid })
    )

    console.log('[PDF_SUCCESS] buffer size:', buffer.length, 'bytes')
    console.log('[PDF_SUCCESS] templateId:', templateId)

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="CV-${fullName || 'MonCV'}.pdf"`,
      },
    })
  } catch (error: unknown) {
    const err = error as { name?: string; message?: string; stack?: string; cause?: { toString?: () => string } }
    console.error('[PDF_GENERATE_ERROR] templateId:', templateId)
    console.error('[PDF_GENERATE_ERROR] fullName:', fullName)
    console.error('[PDF_GENERATE_ERROR] name:', err?.name)
    console.error('[PDF_GENERATE_ERROR] message:', err?.message)
    console.error('[PDF_GENERATE_ERROR] stack:', err?.stack)
    console.error('[PDF_GENERATE_ERROR] cause:', err?.cause?.toString?.())

    return NextResponse.json(
      {
        error: err?.message || 'Erreur generation PDF',
        templateId,
      },
      { status: 500 }
    )
  }
}
