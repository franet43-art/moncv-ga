import React from 'react'
import { Image, View } from '@react-pdf/renderer'

interface PDFPhotoProps {
  src?: string
  style?: any
}

export function PDFPhoto({ src, style }: PDFPhotoProps) {
  if (!src) return null

  return (
    <View style={[style, { overflow: 'hidden', borderRadius: 999 }]}>
      <Image src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </View>
  )
}

