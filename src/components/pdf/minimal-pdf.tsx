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
        <Text style={[styles.minimalName, { fontSize: 32, textAlign: 'center' }]}>{personalInfo.fullName || ''}</Text>
        {personalInfo.jobTitle && <Text style={[styles.jobTitle, { color: '#4B5563', marginBottom: 15 }]}>{personalInfo.jobTitle || ''}</Text>}

        <View style={[styles.flexRow, { flexWrap: 'wrap', justifyContent: 'center' }]}>
          {personalInfo.email && <Text style={[styles.body, { marginRight: 15 }]}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={[styles.body, { marginRight: 15 }]}>{personalInfo.phone}</Text>}
          {personalInfo.address && <Text style={[styles.body, { marginRight: 15 }]}>{personalInfo.address}</Text>}
          {personalInfo.linkedin && <Text style={styles.body}>{personalInfo.linkedin}</Text>}
        </View>

      </View>

      {/* Summary */}
      {personalInfo.summary && (
        <View style={{ marginBottom: 25, paddingHorizontal: 20 }} wrap={false}>
          <Text style={[styles.body, { textAlign: 'center', fontStyle: 'italic' }]}>{personalInfo.summary || ''}</Text>
        </View>
      )}

      {/* Main content with side margins */}
      <View style={{ paddingHorizontal: 10 }}>
        {/* Experience */}
        {experiences.length > 0 && (
          <View wrap style={{ marginBottom: 15 }}>
            <Text style={styles.minimalSectionTitle}>Expériences</Text>
            <View style={{ borderLeftWidth: 1, borderLeftColor: '#E5E7EB', paddingLeft: 15, marginLeft: 5 }}>
              {(experiences || []).map((exp) => (
                <View key={exp.id} style={{ marginBottom: 8 }}>
                  <PDFExperience experience={exp} styles={styles} />
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View wrap style={{ marginBottom: 15 }}>
            <Text style={styles.minimalSectionTitle}>Formation</Text>
            <View style={{ borderLeftWidth: 1, borderLeftColor: '#E5E7EB', paddingLeft: 15, marginLeft: 5 }}>
              {(education || []).map((edu) => (
                <View key={edu.id} style={{ marginBottom: 8 }}>
                  <PDFEducation education={edu} styles={styles} />
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Skills & Languages Row */}
        <View style={[styles.flexRow, { alignItems: 'flex-start', marginBottom: 15 }]} wrap={false}>
          {skills.length > 0 && (
            <View style={{ flex: 1, paddingRight: 15 }}>

              <Text style={styles.minimalSectionTitle}>Compétences</Text>
              <View style={styles.gap1}>
                {(skills || []).map(skill => (
                  <Text key={skill.id} style={styles.body}>• {skill.name || ''} {skill.level && <Text style={{ color: '#6B7280' }}>({skill.level})</Text>}</Text>
                ))}
              </View>
            </View>
          )}

          {languages.length > 0 && (
            <View style={{ flex: 1 }}>
              <Text style={styles.minimalSectionTitle}>Langues</Text>
              <View style={styles.gap1}>
                {(languages || []).map(lang => (
                  <Text key={lang.id} style={styles.body}>• {lang.name || ''} {lang.level && <Text style={{ color: '#6B7280' }}>({lang.level})</Text>}</Text>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* References */}
        {references.length > 0 && (
          <View wrap style={{ marginBottom: 15 }}>
            <Text style={styles.minimalSectionTitle}>Références</Text>
            <View style={[styles.flexRow, { flexWrap: 'wrap', marginBottom: 15 }]}>
              {(references || []).map((ref) => (
                <View key={ref.id} wrap={false} style={{ width: '45%', marginBottom: 12, marginRight: '5%' }}>

                  <Text style={[styles.body, { fontWeight: 'bold' }]}>{ref.name || ''}</Text>
                  {(ref.position || ref.company) && (
                    <Text style={styles.body}>{ref.position || ''} {ref.company && `- ${ref.company}`}</Text>
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
