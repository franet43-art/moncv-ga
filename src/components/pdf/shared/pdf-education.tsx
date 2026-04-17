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
    <View wrap={false} style={styles.entryBlock}>
      <View style={styles.flexRowBetween}>
        <Text style={styles.entryTitle}>{education.degree}</Text>
        <Text style={styles.entryDate}>
          {formatDate(education.startDate)} - {formatDate(education.endDate, education.isCurrent)}
        </Text>
      </View>
      <Text style={styles.entrySubtitle}>{education.institution}</Text>
      {education.field ? (
        <Text style={styles.entryDescription}>{education.field}</Text>
      ) : null}
    </View>
  )
}
