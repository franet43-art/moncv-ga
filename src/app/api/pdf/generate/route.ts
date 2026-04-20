import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { CVPDFDocument } from '@/components/pdf/pdf-document'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const { content, settings, isPaid } = await req.json()

    if (!content?.personalInfo) {
      return NextResponse.json({ error: 'Données CV invalides' }, { status: 400 })
    }

    const buffer = await renderToBuffer(
      React.createElement(CVPDFDocument, { content, settings, isPaid })
    )

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="CV-${content.personalInfo?.fullName || 'MonCV'}.pdf"`,
      },
    })
  } catch (error: any) {
    console.error('[PDF_GENERATE_ERROR]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
