import React from 'react'
import { Text, View, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { createStyles } from '@/lib/pdf/styles'
import { PDFExperience } from './shared/pdf-experience'
import { PDFEducation } from './shared/pdf-education'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'

interface ModernPDFProps {
  content: CVContent
  settings: CVSettings
}

export function ModernPDF({ content, settings }: ModernPDFProps) {
  const baseStyles = createStyles(settings.accentColor, settings.fontSize, settings.fontFamily)
  const { personalInfo, experiences, education, skills, languages, references } = content

  const styles = StyleSheet.create({
    ...baseStyles,
    page: {
      flexDirection: 'row',
      fontFamily: 'Inter',
      height: '100%',
    },
    sidebar: {
      width: '35%',
      minHeight: '100%',
      backgroundColor: settings.accentColor,
      paddingTop: 24,
      paddingHorizontal: 16,
      alignItems: 'center',
      color: 'white',
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
      marginTop: 24,
      borderBottomWidth: 2,
      borderBottomColor: settings.accentColor,
      fontWeight: 700,
    },
    modernSectionTitle: {
      ...baseStyles.modernSectionTitle,
      color: 'white',
      borderBottomColor: 'rgba(255,255,255,0.3)',
      fontWeight: 700,
    }
  });

  return (
    <View style={styles.page} wrap>
      {/* Sidebar */}
      <View style={styles.sidebar} wrap={false}>
        {settings.photoUrl && (
          <View style={styles.avatarWrapper}>
            <PDFPhoto 
              src={settings.photoUrl} 
              style={styles.avatar} 
            />
          </View>
        )}

        <View style={{ width: '100%', marginBottom: 24, alignItems: 'center' }}>
          <Text style={[baseStyles.name, { color: 'white', textAlign: 'center', marginBottom: 4, fontWeight: 700 }]}>
            {sanitizeForPDF(personalInfo.fullName)}
          </Text>
          {personalInfo.jobTitle && (
            <Text style={{ 
              fontSize: baseStyles.jobTitle.fontSize, 
              color: 'rgba(255,255,255,0.85)', 
              textTransform: 'uppercase', 
              letterSpacing: 1.5,
              textAlign: 'center',
              fontWeight: 700
            }}>
              {sanitizeForPDF(personalInfo.jobTitle)}
            </Text>
          )}
        </View>

        <View style={{ width: '100%', marginBottom: 24 }}>
          {personalInfo.email && <Text style={[baseStyles.body, { color: 'rgba(255,255,255,0.9)', marginBottom: 4 }]}>{sanitizeForPDF(personalInfo.email)}</Text>}
          {personalInfo.phone && <Text style={[baseStyles.body, { color: 'rgba(255,255,255,0.9)', marginBottom: 4 }]}>{sanitizeForPDF(personalInfo.phone)}</Text>}
          {personalInfo.address && <Text style={[baseStyles.body, { color: 'rgba(255,255,255,0.9)', marginBottom: 4 }]}>{sanitizeForPDF(personalInfo.address)}</Text>}
          {personalInfo.linkedin && <Text style={[baseStyles.body, { color: 'rgba(255,255,255,0.9)', marginBottom: 4, fontSize: baseStyles.body.fontSize - 1 }]}>{sanitizeForPDF(personalInfo.linkedin)}</Text>}
        </View>

        {skills.length > 0 && (
          <View style={{ width: '100%', marginBottom: 20 }}>
            <Text style={styles.modernSectionTitle}>Compétences</Text>
            {skills.map(skill => (
              <Text key={skill.id} style={[baseStyles.body, { color: 'rgba(255,255,255,0.9)', marginBottom: 4 }]}>
                • {sanitizeForPDF(skill.name)}
              </Text>
            ))}
          </View>
        )}

        {languages.length > 0 && (
          <View style={{ width: '100%' }}>
            <Text style={styles.modernSectionTitle}>Langues</Text>
            {languages.map(lang => (
              <Text key={lang.id} style={[baseStyles.body, { color: 'rgba(255,255,255,0.9)', marginBottom: 4 }]}>
                • {sanitizeForPDF(lang.name)}
              </Text>
            ))}
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.main} wrap>
        {personalInfo.summary && (
          <View style={{ width: '100%', marginBottom: 24 }} wrap={false}>
            <Text style={baseStyles.body}>{sanitizeForPDF(personalInfo.summary)}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={{ width: '100%' }} wrap>
            <Text style={[styles.sectionTitle, { marginTop: 0 }]}>
              Expériences
            </Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={{ marginBottom: 12 }}>
                <Text style={[baseStyles.body, { fontWeight: 700 }]}>{sanitizeForPDF(exp.position)}</Text>
                <Text style={[baseStyles.body, { fontWeight: 600 }]}>{sanitizeForPDF(exp.company)}</Text>
                {exp.description && (
                  <View style={{ width: '100%', marginTop: 2 }}>
                    <Text style={baseStyles.body}>{sanitizeForPDF(exp.description)}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={{ width: '100%' }} wrap>
            <Text style={styles.sectionTitle}>
              Formation
            </Text>
            {education.map((edu) => (
              <View key={edu.id} style={{ marginBottom: 12 }}>
                <Text style={[baseStyles.body, { fontWeight: 700 }]}>{sanitizeForPDF(edu.degree)}</Text>
                <Text style={[baseStyles.body, { fontWeight: 600 }]}>{sanitizeForPDF(edu.school)}</Text>
                {edu.description && (
                  <View style={{ width: '100%', marginTop: 2 }}>
                    <Text style={baseStyles.body}>{sanitizeForPDF(edu.description)}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {references.length > 0 && (
          <View style={{ width: '100%' }} wrap>
            <Text style={styles.sectionTitle}>
              Références
            </Text>
            {references.map((ref) => (
              <View key={ref.id} wrap={false} style={{ marginBottom: 12 }}>
                <Text style={[baseStyles.body, { fontWeight: 700 }]}>{sanitizeForPDF(ref.name)}</Text>
                {ref.position && <Text style={baseStyles.body}>{sanitizeForPDF(ref.position)}</Text>}
                {ref.company && <Text style={baseStyles.body}>{sanitizeForPDF(ref.company)}</Text>}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}
