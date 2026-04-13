import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { Experience } from '@/types/cv'
import { formatDate } from '@/lib/pdf/helpers'

interface PDFExperienceProps {
  experience: Experience
  styles: ReturnType<typeof import("@/lib/pdf/styles").createStyles>
}

export function PDFExperience({ experience, styles }: PDFExperienceProps) {
  return (
    <View wrap={false} style={{ marginBottom: 10 }}>
      <View style={styles.flexRowBetween}>
        <Text style={[styles.body, { fontWeight: 'bold' }]}>{experience.position}</Text>
        <Text style={styles.muted}>
          {formatDate(experience.startDate)} - {formatDate(experience.endDate, experience.isCurrent)}
        </Text>
      </View>
      <Text style={[styles.body, { fontStyle: 'italic', marginBottom: 4 }]}>{experience.company}</Text>
      {experience.description ? (
        <Text style={styles.body}>{experience.description}</Text>
      ) : null}
    </View>
  )
}
