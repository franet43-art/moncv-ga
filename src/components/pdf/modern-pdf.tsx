import React from 'react'
import { Text, View } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { createStyles } from '@/lib/pdf/styles'
import { PDFExperience } from './shared/pdf-experience'
import { PDFEducation } from './shared/pdf-education'
import { PDFPhoto } from './shared/pdf-photo'

interface ModernPDFProps {
  content: CVContent
  settings: CVSettings
}

export function ModernPDF({ content, settings }: ModernPDFProps) {
  const styles = createStyles(settings.accentColor, settings.fontSize, settings.fontFamily)
  const { personalInfo, experiences, education, skills, languages, references } = content

  return (
    <View style={[styles.flexRow, { height: '100%' }]} wrap>
      {/* Sidebar */}
      <View style={styles.modernSidebar} wrap={false}>
        {settings.photoUrl && (
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <PDFPhoto src={settings.photoUrl} style={[styles.photo, { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: 'white' }]} />
          </View>
        )}

        <View style={styles.gap2}>
          {personalInfo.email && <Text style={[styles.body, { color: 'white' }]}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={[styles.body, { color: 'white' }]}>{personalInfo.phone}</Text>}
          {personalInfo.address && <Text style={[styles.body, { color: 'white' }]}>{personalInfo.address}</Text>}
          {personalInfo.linkedin && <Text style={[styles.body, { color: 'white', fontSize: styles.body.fontSize - 1 }]}>{personalInfo.linkedin}</Text>}
        </View>

        {skills.length > 0 && (
          <View>
            <Text style={styles.modernSectionTitle}>Compétences</Text>
            <View style={styles.gap1}>
              {skills.map(skill => (
                <Text key={skill.id} style={[styles.body, { color: 'white' }]}>
                  {skill.name} {skill.level && `- ${skill.level}`}
                </Text>
              ))}
            </View>
          </View>
        )}

        {languages.length > 0 && (
          <View>
            <Text style={styles.modernSectionTitle}>Langues</Text>
            <View style={styles.gap1}>
              {languages.map(lang => (
                <Text key={lang.id} style={[styles.body, { color: 'white' }]}>
                  {lang.name} - {lang.level}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.modernMain} wrap>
        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.name, { fontSize: styles.name.fontSize + 4 }]}>{personalInfo.fullName}</Text>
          {personalInfo.jobTitle && <Text style={[styles.jobTitle, { fontSize: styles.jobTitle.fontSize + 2 }]}>{personalInfo.jobTitle}</Text>}
        </View>

        {personalInfo.summary && (
          <View style={{ marginBottom: 20 }} wrap={false}>
            <Text style={styles.body}>{personalInfo.summary}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View wrap>
            <Text style={[styles.sectionTitle, { color: '#111827', borderBottomColor: '#E5E7EB' }]}>Expériences</Text>
            {experiences.map((exp) => (
              <PDFExperience key={exp.id} experience={exp} styles={styles} />
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View wrap>
            <Text style={[styles.sectionTitle, { color: '#111827', borderBottomColor: '#E5E7EB' }]}>Formation</Text>
            {education.map((edu) => (
              <PDFEducation key={edu.id} education={edu} styles={styles} />
            ))}
          </View>
        )}

        {references.length > 0 && (
          <View wrap>
            <Text style={[styles.sectionTitle, { color: '#111827', borderBottomColor: '#E5E7EB' }]}>Références</Text>
            {references.map((ref) => (
              <View key={ref.id} wrap={false} style={{ marginBottom: 5 }}>
                <Text style={[styles.body, { fontWeight: 'bold' }]}>{ref.name}</Text>
                {(ref.position || ref.company) && (
                  <Text style={styles.body}>{ref.position} - {ref.company}</Text>
                )}
                {ref.email && <Text style={styles.body}>{ref.email}</Text>}
                {ref.phone && <Text style={styles.body}>{ref.phone}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}
