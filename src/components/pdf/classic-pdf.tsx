import React from 'react'
import { Text, View, Font } from '@react-pdf/renderer'

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
  ],
})
import { CVContent, CVSettings } from '@/types/cv'
import { createStyles, spacing } from '@/lib/pdf/styles'
import { PDFSection } from './shared/pdf-section'
import { PDFExperience } from './shared/pdf-experience'
import { PDFEducation } from './shared/pdf-education'
import { PDFPhoto } from './shared/pdf-photo'

interface ClassicPDFProps {
  content: CVContent
  settings: CVSettings
}

export function ClassicPDF({ content, settings }: ClassicPDFProps) {
  const styles = createStyles(settings.accentColor, settings.fontSize, settings.fontFamily)
  const { personalInfo, experiences, education, skills, languages, references } = content

  return (
    <View style={styles.page} wrap>
      {/* Header */}
      <View style={[styles.flexRowBetween, { marginBottom: 20 }]}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { fontSize: 28, fontWeight: 700 }]}>{personalInfo.fullName || ''}</Text>
          {personalInfo.jobTitle && (
            <Text style={[styles.jobTitle, { fontSize: 14, color: settings.accentColor, fontStyle: 'italic' }]}>{personalInfo.jobTitle || ''}</Text>
          )}
          <View style={styles.gap1}>
            {personalInfo.email && <Text style={styles.body}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.body}>{personalInfo.phone}</Text>}
            {personalInfo.address && <Text style={styles.body}>{personalInfo.address}</Text>}
            {personalInfo.linkedin && <Text style={styles.body}>{personalInfo.linkedin}</Text>}
          </View>
        </View>
        {settings.photoUrl && (
          <PDFPhoto src={settings.photoUrl} style={styles.photo} />
        )}
      </View>

      {/* Summary */}
      {personalInfo.summary && (
        <View style={{ marginBottom: 15 }} wrap={false}>
          <Text style={styles.body}>{personalInfo.summary || ''}</Text>
        </View>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <View wrap>
          <Text style={[styles.sectionTitle, { color: settings.accentColor, borderBottomColor: settings.accentColor }]}>Expérience Professionnelle</Text>
          {(experiences || []).map((exp) => (
            <View key={exp.id} style={{ marginBottom: 8 }}>
              <PDFExperience experience={exp} styles={styles} />
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {education.length > 0 && (
        <View wrap>
          <Text style={[styles.sectionTitle, { color: settings.accentColor, borderBottomColor: settings.accentColor }]}>Formation</Text>
          {(education || []).map((edu) => (
            <View key={edu.id} style={{ marginBottom: 8 }}>
              <PDFEducation education={edu} styles={styles} />
            </View>
          ))}
        </View>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <View wrap={false}>
          <Text style={[styles.sectionTitle, { color: settings.accentColor, borderBottomColor: settings.accentColor }]}>Compétences</Text>
          <View style={[styles.flexRow, { flexWrap: 'wrap', gap: 10 }]}>
            {(skills || []).map((skill) => (
              <Text key={skill.id} style={styles.body}>
                • {skill.name || ''} {skill.level ? `(${skill.level})` : ''}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <View wrap={false}>
          <Text style={[styles.sectionTitle, { color: settings.accentColor, borderBottomColor: settings.accentColor }]}>Langues</Text>
          <View style={[styles.flexRow, { flexWrap: 'wrap', gap: 10 }]}>
            {(languages || []).map((lang) => (
              <Text key={lang.id} style={styles.body}>
                • {lang.name || ''} {lang.level ? `(${lang.level})` : ''}
              </Text>
            ))}
          </View>
        </View>
      )}

      {/* References */}
      {references.length > 0 && (
        <View wrap>
          <Text style={[styles.sectionTitle, { color: settings.accentColor, borderBottomColor: settings.accentColor }]}>Références</Text>
          <View style={{ gap: spacing.md }}>
            {(references || []).map((ref) => (
              <View key={ref.id} wrap={false}>
                <Text style={[styles.body, { fontWeight: 'bold' }]}>{ref.name || ''}</Text>
                {(ref.position || ref.company) && (
                  <Text style={styles.body}>
                    {ref.position || ''} {ref.position && ref.company && 'chez '} {ref.company || ''}
                  </Text>
                )}
                {ref.email && <Text style={styles.body}>{ref.email}</Text>}
                {ref.phone && <Text style={styles.body}>{ref.phone}</Text>}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )
}
