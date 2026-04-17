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
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <PDFPhoto 
              src={settings.photoUrl} 
              style={[styles.photo, { 
                width: 90, 
                height: 90, 
                borderRadius: 45, 
                borderWidth: 3, 
                borderColor: 'rgba(255,255,255,0.3)' 
              }]} 
            />
          </View>
        )}

        <View style={{ marginBottom: 24, alignItems: 'center' }}>
          <Text style={[styles.name, { color: 'white', textAlign: 'center', marginBottom: 4 }]}>
            {personalInfo.fullName}
          </Text>
          {personalInfo.jobTitle && (
            <Text style={{ 
              fontSize: styles.jobTitle.fontSize, 
              color: 'rgba(255,255,255,0.85)', 
              textTransform: 'uppercase', 
              letterSpacing: 1.5,
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              {personalInfo.jobTitle}
            </Text>
          )}
        </View>

        <View style={{ gap: 8, marginBottom: 24 }}>
          {personalInfo.email && <Text style={[styles.body, { color: 'rgba(255,255,255,0.9)' }]}>{personalInfo.email}</Text>}
          {personalInfo.phone && <Text style={[styles.body, { color: 'rgba(255,255,255,0.9)' }]}>{personalInfo.phone}</Text>}
          {personalInfo.address && <Text style={[styles.body, { color: 'rgba(255,255,255,0.9)' }]}>{personalInfo.address}</Text>}
          {personalInfo.linkedin && <Text style={[styles.body, { color: 'rgba(255,255,255,0.9)', fontSize: styles.body.fontSize - 1 }]}>{personalInfo.linkedin}</Text>}
        </View>

        {skills.length > 0 && (
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.modernSectionTitle}>Compétences</Text>
            <View style={{ gap: 4 }}>
              {skills.map(skill => (
                <Text key={skill.id} style={[styles.body, { color: 'rgba(255,255,255,0.9)' }]}>
                  • {skill.name} {skill.level && `(${skill.level})`}
                </Text>
              ))}
            </View>
          </View>
        )}

        {languages.length > 0 && (
          <View>
            <Text style={styles.modernSectionTitle}>Langues</Text>
            <View style={{ gap: 4 }}>
              {languages.map(lang => (
                <Text key={lang.id} style={[styles.body, { color: 'rgba(255,255,255,0.9)' }]}>
                  • {lang.name} ({lang.level})
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* Main Content */}
      <View style={styles.modernMain} wrap>
        {personalInfo.summary && (
          <View style={{ marginBottom: 24 }} wrap={false}>
            <Text style={styles.body}>{personalInfo.summary}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View wrap>
            <Text style={[styles.sectionTitle, { 
              marginTop: 0, 
              borderBottomWidth: 2, 
              borderBottomColor: settings.accentColor 
            }]}>
              Expériences
            </Text>
            {experiences.map((exp) => (
              <PDFExperience key={exp.id} experience={exp} styles={styles} />
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View wrap>
            <Text style={[styles.sectionTitle, { 
              marginTop: 24, 
              borderBottomWidth: 2, 
              borderBottomColor: settings.accentColor 
            }]}>
              Formation
            </Text>
            {education.map((edu) => (
              <PDFEducation key={edu.id} education={edu} styles={styles} />
            ))}
          </View>
        )}

        {references.length > 0 && (
          <View wrap>
            <Text style={[styles.sectionTitle, { 
              marginTop: 24, 
              borderBottomWidth: 2, 
              borderBottomColor: settings.accentColor 
            }]}>
              Références
            </Text>
            <View style={{ gap: 12 }}>
              {references.map((ref) => (
                <View key={ref.id} wrap={false}>
                  <Text style={[styles.body, { fontWeight: 'bold' }]}>{ref.name}</Text>
                  {(ref.position || ref.company) && (
                    <Text style={styles.body}>{ref.position} - {ref.company}</Text>
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
