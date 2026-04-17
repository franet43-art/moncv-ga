import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { Experience } from '@/types/cv'
import { formatDate } from '@/lib/pdf/helpers'

interface PDFExperienceProps {
  experience: Experience
  styles: any
}

export function PDFExperience({ experience, styles }: PDFExperienceProps) {
  return (
    <View wrap={false} style={styles.entryBlock}>
      <View style={styles.flexRowBetween}>
        <Text style={styles.entryTitle}>{experience.position || ''}</Text>
        <Text style={styles.entryDate}>
          {formatDate(experience.startDate)} - {formatDate(experience.endDate, experience.isCurrent)}
        </Text>
      </View>
      <Text style={styles.entrySubtitle}>{experience.company || ''}</Text>
      {experience.description ? (
        <Text style={styles.entryDescription}>{experience.description}</Text>
      ) : null}
    </View>
  )
}
