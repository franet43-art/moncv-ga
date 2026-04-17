import React from 'react'
import { Document, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { ClassicPDF } from './classic-pdf'
import { ModernPDF } from './modern-pdf'
import { MinimalPDF } from './minimal-pdf'

const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

try {
  Font.register({
    family: 'Inter',
    fonts: [
      { src: `${baseUrl}/fonts/Inter-Regular.ttf`, fontWeight: 400 },
      { src: `${baseUrl}/fonts/Inter-SemiBold.ttf`, fontWeight: 600 },
      { src: `${baseUrl}/fonts/Inter-Bold.ttf`, fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
} catch (e) {
  console.warn('[PDF] Erreur Font.register:', e);
}

export const sanitizeForPDF = (text?: string | null): string =>
  (text ?? '')
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\u2013|\u2014/g, '-')
    .replace(/\u2026/g, '...')
    .replace(/[^\u0000-\u024F]/g, '');


interface CVPDFDocumentProps {
  content: CVContent
  settings: CVSettings
  isPaid?: boolean
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#ffffff',
  },
  watermarkContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100,
  },
  watermarkText: {
    fontSize: 60,
    color: 'rgba(0, 0, 0, 0.08)',
    transform: 'rotate(-45deg)',
    fontWeight: 'bold',
    textAlign: 'center',
  }
})

export function CVPDFDocument({ content, settings, isPaid = false }: CVPDFDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={[styles.page, settings.templateId === 'modern' ? { padding: 0 } : {}]} wrap>
        {!isPaid && (
          <View style={styles.watermarkContainer} fixed>
            <Text style={styles.watermarkText}>BROUILLON - MonCV.ga</Text>
          </View>
        )}
        {settings.templateId === 'classic' && <ClassicPDF content={content} settings={settings} />}
        {settings.templateId === 'modern' && <ModernPDF content={content} settings={settings} />}
        {settings.templateId === 'minimal' && <MinimalPDF content={content} settings={settings} />}
      </Page>
    </Document>
  )
}
