import { NextRequest, NextResponse } from 'next/server'
import React from 'react'
import { renderToBuffer } from '@react-pdf/renderer'
import { CVPDFDocument } from '@/components/pdf/pdf-document'
import type { CVContent, CVSettings } from '@/types/cv'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const { content, settings, isPaid } = (await request.json()) as {
      content: CVContent
      settings: CVSettings
      isPaid: boolean
    }

    const buffer = await renderToBuffer(
      React.createElement(CVPDFDocument, {
        content,
        settings,
        isPaid,
      }) as any
    )

    const uint8Array = new Uint8Array(buffer)

    return new NextResponse(uint8Array, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="CV-${
          content.personalInfo?.fullName ?? 'document'
        }.pdf"`,
      },
    })
  } catch (error) {
    console.error('[PDF_GENERATE_ERROR]', error)
    return NextResponse.json(
      { error: 'PDF generation failed' },
      { status: 500 }
    )
  }
}
