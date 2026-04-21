import React from 'react'
import { Document, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { ClassicPDF } from './classic-pdf'
import { ModernPDF } from './modern-pdf'
import { MinimalPDF } from './minimal-pdf'

Font.registerHyphenationCallback((word) => [word])

export const sanitizeForPDF = (text?: string | null): string =>
  (text ?? '')
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\u2013|\u2014/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/[^\u0000-\u024F]/g, '')

interface CVPDFDocumentProps {
  content: CVContent
  settings: CVSettings
  isPaid?: boolean
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
    color: '#000000',
    padding: 0,
  },
  watermarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  watermarkText: {
    fontSize: 60,
    color: '#000000',
    opacity: 0.06,
    fontWeight: 'bold',
    transform: 'rotate(-45deg)',
    textAlign: 'center',
  },
})

export function CVPDFDocument({ content, settings, isPaid = false }: CVPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        {!isPaid && (
          <View style={styles.watermarkContainer} fixed>
            <Text style={styles.watermarkText}>BROUILLON - MonCV.ga</Text>
          </View>
        )}
        {settings.templateId === 'classic' && (
          <ClassicPDF content={content} settings={settings} />
        )}
        {settings.templateId === 'modern' && (
          <ModernPDF content={content} settings={settings} />
        )}
        {settings.templateId === 'minimal' && (
          <MinimalPDF content={content} settings={settings} />
        )}
      </Page>
    </Document>
  )
}
