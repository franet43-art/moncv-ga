import React from 'react'
import { Image, View } from '@react-pdf/renderer'

interface PDFPhotoProps {
  src?: string
  style?: any
}

export function PDFPhoto({ src, style }: PDFPhotoProps) {
  if (!src) return null

  return (
    <View style={style}>
      <Image src={src} style={{ width: '100%', height: '100%', borderRadius: 999 }} />
    </View>
  )
}
