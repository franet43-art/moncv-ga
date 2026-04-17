import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { createStyles, spacing } from '@/lib/pdf/styles'
import { PDFExperience } from './shared/pdf-experience'
import { PDFEducation } from './shared/pdf-education'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'

interface ClassicPDFProps {
  content: CVContent
  settings: CVSettings
}

export function ClassicPDF({ content, settings }: ClassicPDFProps) {
  const baseStyles = createStyles(settings.accentColor, settings.fontSize, settings.fontFamily)
  const { personalInfo, experiences, education, skills, languages, references } = content

  const styles = StyleSheet.create({
    ...baseStyles,
    page: {
      flexDirection: 'row',
      fontFamily: 'Inter',
      backgroundColor: '#FFFFFF',
    },
    sidebar: {
      width: '35%',
      minHeight: '100%',
      paddingTop: 24,
      paddingHorizontal: 16,
      backgroundColor: '#F9FAFB',
      alignItems: 'center',
    },
    main: {
      width: '65%',
      paddingTop: 24,
      paddingHorizontal: 20,
    },
    avatarWrapper: {
      width: 80,
      height: 80,
      borderRadius: 40,
      overflow: 'hidden',
      marginBottom: 12,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      objectFit: 'cover',
    },
    sectionTitle: {
      ...baseStyles.sectionTitle,
      fontWeight: 700,
      borderBottomWidth: 1,
      borderBottomColor: settings.accentColor,
      color: settings.accentColor,
      marginTop: 15,
      marginBottom: 10,
    },
    entryTitle: {
      ...baseStyles.entryTitle,
      fontWeight: 700,
    },
    body: {
      ...baseStyles.body,
      fontWeight: 400,
    },
    bold: {
      fontWeight: 700,
    }
  });

  return (
    <View style={styles.page} wrap>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        {settings.photoUrl && (
          <View style={styles.avatarWrapper}>
            <PDFPhoto src={settings.photoUrl} style={styles.avatar} />
          </View>
        )}
        
        <View style={{ width: '100%', marginBottom: 20, alignItems: 'center' }}>
          <Text style={[styles.name, { fontSize: 20, textAlign: 'center', fontWeight: 700 }]}>
            {sanitizeForPDF(personalInfo.fullName)}
          </Text>
          {personalInfo.jobTitle && (
            <Text style={[styles.jobTitle, { fontSize: 12, textAlign: 'center', fontWeight: 600 }]}>
              {sanitizeForPDF(personalInfo.jobTitle)}
            </Text>
          )}
        </View>

        <View style={{ width: '100%', marginBottom: 20 }}>
          {personalInfo.email && <Text style={[styles.body, { marginBottom: 4, fontSize: 8 }]}>{sanitizeForPDF(personalInfo.email)}</Text>}
          {personalInfo.phone && <Text style={[styles.body, { marginBottom: 4, fontSize: 8 }]}>{sanitizeForPDF(personalInfo.phone)}</Text>}
          {personalInfo.address && <Text style={[styles.body, { marginBottom: 4, fontSize: 8 }]}>{sanitizeForPDF(personalInfo.address)}</Text>}
          {personalInfo.linkedin && <Text style={[styles.body, { marginBottom: 4, fontSize: 8 }]}>{sanitizeForPDF(personalInfo.linkedin)}</Text>}
        </View>

        {skills.length > 0 && (
          <View style={{ width: '100%', marginBottom: 15 }}>
            <Text style={[styles.sectionTitle, { fontSize: 10, borderBottomWidth: 0, marginTop: 0 }]}>Compétences</Text>
            {skills.map(skill => (
              <Text key={skill.id} style={[styles.body, { marginBottom: 3, fontSize: 8 }]}>
                • {sanitizeForPDF(skill.name)}
              </Text>
            ))}
          </View>
        )}

        {languages.length > 0 && (
          <View style={{ width: '100%' }}>
            <Text style={[styles.sectionTitle, { fontSize: 10, borderBottomWidth: 0, marginTop: 0 }]}>Langues</Text>
            {languages.map(lang => (
              <Text key={lang.id} style={[styles.body, { marginBottom: 3, fontSize: 8 }]}>
                • {sanitizeForPDF(lang.name)}
              </Text>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        {personalInfo.summary && (
          <View style={{ width: '100%', marginBottom: 16 }}>
            <Text style={styles.body}>{sanitizeForPDF(personalInfo.summary)}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={{ width: '100%' }}>
            <Text style={styles.sectionTitle}>Expérience</Text>
            {experiences.map(exp => (
              <View key={exp.id} style={{ marginBottom: 10 }}>
                <Text style={[styles.body, { fontWeight: 700 }]}>{sanitizeForPDF(exp.position)}</Text>
                <Text style={[styles.body, { fontWeight: 600 }]}>{sanitizeForPDF(exp.company)}</Text>
                {exp.description && (
                  <View style={{ width: '100%', marginTop: 2 }}>
                    <Text style={styles.body}>{sanitizeForPDF(exp.description)}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={{ width: '100%' }}>
            <Text style={styles.sectionTitle}>Formation</Text>
            {education.map(edu => (
              <View key={edu.id} style={{ marginBottom: 10 }}>
                <Text style={[styles.body, { fontWeight: 700 }]}>{sanitizeForPDF(edu.degree)}</Text>
                <Text style={[styles.body, { fontWeight: 600 }]}>{sanitizeForPDF(edu.institution)}</Text>
              </View>
            ))}
          </View>
        )}

        {references.length > 0 && (
          <View style={{ width: '100%' }}>
            <Text style={styles.sectionTitle}>Références</Text>
            {references.map(ref => (
              <View key={ref.id} style={{ marginBottom: 8 }}>
                <Text style={[styles.body, { fontWeight: 700 }]}>{sanitizeForPDF(ref.name)}</Text>
                {ref.position && <Text style={styles.body}>{sanitizeForPDF(ref.position)}</Text>}
                {ref.company && <Text style={styles.body}>{sanitizeForPDF(ref.company)}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}
