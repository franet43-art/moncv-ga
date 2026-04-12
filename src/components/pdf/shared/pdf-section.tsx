import React from 'react'
import { Text, View } from '@react-pdf/renderer'

interface PDFSectionProps {
  title: string
  style?: any
  children: React.ReactNode
}

export function PDFSection({ title, style, children }: PDFSectionProps) {
  return (
    <View wrap={false} style={{ marginBottom: 15 }}>
      <Text style={style}>{title}</Text>
      <View>{children}</View>
    </View>
  )
}
