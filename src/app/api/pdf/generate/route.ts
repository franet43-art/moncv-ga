import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { CVPDFDocument } from '@/components/pdf/pdf-document'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  let templateId = 'unknown'
  try {
    const body = await req.json()
    const { content, settings, isPaid } = body
    templateId = settings?.templateId || 'unknown'

    console.log('[PDF_START] templateId:', templateId)
    console.log('[PDF_CONTENT] fullName:', content?.personalInfo?.fullName)

    if (!content?.personalInfo) {
      return NextResponse.json({ error: 'Donnees CV invalides' }, { status: 400 })
    }

    const buffer = await renderToBuffer(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.createElement(CVPDFDocument, { content, settings, isPaid: isPaid ?? false }) as any
    )

    console.log('[PDF_SUCCESS] templateId:', templateId, '| bytes:', buffer.length)

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="CV-${content.personalInfo?.fullName || 'MonCV'}.pdf"`,
      },
    })
  } catch (error: unknown) {
    const err = error as { message?: string; stack?: string }
    console.error('[PDF_GENERATE_ERROR] templateId:', templateId)
    console.error('[PDF_GENERATE_ERROR] message:', err?.message)
    console.error('[PDF_GENERATE_ERROR] stack:', err?.stack?.split('\n').slice(0, 6).join('\n'))
    return NextResponse.json(
      { error: err?.message || 'Erreur generation PDF' },
      { status: 500 }
    )
  }
}
