import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { Education } from '@/types/cv'
import { formatDate } from '@/lib/pdf/helpers'

interface PDFEducationProps {
  education: Education
  styles: any
}

export function PDFEducation({ education, styles }: PDFEducationProps) {
  return (
    <View wrap={false} style={{ marginBottom: 10 }}>
      <View style={styles.flexRowBetween}>
        <Text style={[styles.body, { fontWeight: 'bold' }]}>{education.degree}</Text>
        <Text style={styles.muted}>
          {formatDate(education.startDate)} - {formatDate(education.endDate, education.isCurrent)}
        </Text>
      </View>
      <Text style={[styles.body, { fontStyle: 'italic' }]}>{education.institution}</Text>
      {education.field ? (
        <Text style={[styles.body, { marginTop: 2 }]}>{education.field}</Text>
      ) : null}
    </View>
  )
}
