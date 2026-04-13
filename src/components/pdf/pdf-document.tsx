import "@/lib/pdf/fonts"
import React from 'react'
import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { ClassicPDF } from './classic-pdf'
import { ModernPDF } from './modern-pdf'
import { MinimalPDF } from './minimal-pdf'

interface CVPDFDocumentProps {
  content: CVContent
  settings: CVSettings
}

const pageStyle = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  }
})

export function CVPDFDocument({ content, settings }: CVPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={[pageStyle.page, settings.templateId === 'modern' ? { padding: 0 } : {}]} wrap>
        {settings.templateId === 'classic' && <ClassicPDF content={content} settings={settings} />}
        {settings.templateId === 'modern' && <ModernPDF content={content} settings={settings} />}
        {settings.templateId === 'minimal' && <MinimalPDF content={content} settings={settings} />}
      </Page>
    </Document>
  )
}
