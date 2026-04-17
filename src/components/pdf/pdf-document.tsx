import React from 'react'
import { Document, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { ClassicPDF } from './classic-pdf'
import { ModernPDF } from './modern-pdf'
import { MinimalPDF } from './minimal-pdf'

// Register Inter font
Font.register({
  family: 'Inter',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2',
      fontWeight: 700,
    },
    {
      src: 'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hiA.woff2',
      fontWeight: 400,
      fontStyle: 'italic'
    }
  ]
})

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
