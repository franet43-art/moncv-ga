import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { createStyles } from '@/lib/pdf/styles'
import { PDFExperience } from './shared/pdf-experience'
import { PDFEducation } from './shared/pdf-education'

interface MinimalPDFProps {
  content: CVContent
  settings: CVSettings
}

export function MinimalPDF({ content, settings }: MinimalPDFProps) {
  const styles = createStyles(settings.accentColor, settings.fontSize, settings.fontFamily)
  const { personalInfo, experiences, education, skills, languages, references } = content

  return (
    <View style={styles.page} wrap>
      {/* Header */}
      <View style={{ alignItems: 'center', marginBottom: 30 }} wrap={false}>
        <Text style={styles.minimalName}>{personalInfo.fullName}</Text>
        {personalInfo.jobTitle && <Text style={[styles.jobTitle, { color: '#4B5563', marginBottom: 15 }]}>{personalInfo.jobTitle}</Text>}

        <View style={[styles.flexRow, { gap: 15, flexWrap: 'wrap', justifyContent: 'center' }]}>
          {personalInfo.email && <Text style={styles.body}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={styles.body}>{personalInfo.phone}</Text>}
          {personalInfo.address && <Text style={styles.body}>{personalInfo.address}</Text>}
          {personalInfo.linkedin && <Text style={styles.body}>{personalInfo.linkedin}</Text>}
        </View>
      </View>

      {/* Summary */}
      {personalInfo.summary && (
        <View style={{ marginBottom: 25, paddingHorizontal: 20 }} wrap={false}>
          <Text style={[styles.body, { textAlign: 'center', fontStyle: 'italic' }]}>{personalInfo.summary}</Text>
        </View>
      )}

      {/* Main content with side margins */}
      <View style={{ paddingHorizontal: 10 }}>
        {/* Experience */}
        {experiences.length > 0 && (
          <View wrap style={{ marginBottom: 15 }}>
            <Text style={styles.minimalSectionTitle}>Expériences</Text>
            <View style={{ borderLeftWidth: 1, borderLeftColor: '#E5E7EB', paddingLeft: 15, marginLeft: 5 }}>
              {experiences.map((exp) => (
                <PDFExperience key={exp.id} experience={exp} styles={styles} />
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View wrap style={{ marginBottom: 15 }}>
            <Text style={styles.minimalSectionTitle}>Formation</Text>
            <View style={{ borderLeftWidth: 1, borderLeftColor: '#E5E7EB', paddingLeft: 15, marginLeft: 5 }}>
              {education.map((edu) => (
                <PDFEducation key={edu.id} education={edu} styles={styles} />
              ))}
            </View>
          </View>
        )}

        {/* Skills & Languages Row */}
        <View style={[styles.flexRow, { alignItems: 'flex-start', gap: 30, marginBottom: 15 }]} wrap={false}>
          {skills.length > 0 && (
            <View style={{ flex: 1 }}>
              <Text style={styles.minimalSectionTitle}>Compétences</Text>
              <View style={styles.gap1}>
                {skills.map(skill => (
                  <Text key={skill.id} style={styles.body}>• {skill.name} {skill.level && <Text style={{ color: '#6B7280' }}>({skill.level})</Text>}</Text>
                ))}
              </View>
            </View>
          )}

          {languages.length > 0 && (
            <View style={{ flex: 1 }}>
              <Text style={styles.minimalSectionTitle}>Langues</Text>
              <View style={styles.gap1}>
                {languages.map(lang => (
                  <Text key={lang.id} style={styles.body}>• {lang.name} <Text style={{ color: '#6B7280' }}>({lang.level})</Text></Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* References */}
        {references.length > 0 && (
          <View wrap style={{ marginBottom: 15 }}>
            <Text style={styles.minimalSectionTitle}>Références</Text>
            <View style={[styles.flexRow, { flexWrap: 'wrap', gap: 20 }]}>
              {references.map((ref) => (
                <View key={ref.id} wrap={false} style={{ width: '45%', marginBottom: 12 }}>
                  <Text style={[styles.body, { fontWeight: 'bold' }]}>{ref.name}</Text>
                  {(ref.position || ref.company) && (
                    <Text style={styles.body}>{ref.position} {ref.company && `- ${ref.company}`}</Text>
                  )}
                  {ref.email && <Text style={styles.body}>{ref.email}</Text>}
                  {ref.phone && <Text style={styles.body}>{ref.phone}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
