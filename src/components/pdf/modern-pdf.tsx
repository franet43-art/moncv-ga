import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import {
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  Globe2Icon,
} from './shared/pdf-icons'

interface ModernPDFProps {
  content: CVContent
  settings: CVSettings
}

const LANGUAGE_LEVEL_PCT: Record<string, number> = {
  basique: 40,
  intermediaire: 60,
  courant: 80,
  bilingue: 100,
  natif: 100,
}

const styles = StyleSheet.create({
  pageLayout: {
    flexDirection: 'row',
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '35%',
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 22,
    paddingRight: 22,
    alignItems: 'center',
  },
  main: {
    width: '65%',
    backgroundColor: '#FFFFFF',
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 28,
    paddingRight: 28,
  },
  photoWrapper: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  photoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    overflow: 'hidden',
  },
  sidebarName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  sidebarJobTitle: {
    fontSize: 10,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sidebarDivider: {
    width: '60%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.3)',
    marginBottom: 18,
  },
  sidebarSection: {
    width: '100%',
    marginBottom: 20,
  },
  sidebarSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactText: {
    fontSize: 8,
    color: '#E5E7EB',
    marginLeft: 6,
    flex: 1,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  languageItem: {
    marginBottom: 8,
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  languageName: {
    fontSize: 8,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  languageLevel: {
    fontSize: 8,
    color: '#E5E7EB',
  },
  languageBarBg: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  languageBarFill: {
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  mainSection: {
    marginBottom: 28,
  },
  mainSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  summaryText: {
    fontSize: 10,
    color: '#3F3F46',
    lineHeight: 1.6,
  },
  experienceItem: {
    marginBottom: 18,
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
    paddingLeft: 12,
  },
  experienceBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 4,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  expPosition: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#18181B',
    flex: 1,
    paddingRight: 8,
  },
  expDate: {
    fontSize: 9,
    color: '#71717A',
    flexShrink: 0,
  },
  expCompany: {
    fontSize: 10,
    color: '#52525B',
    marginBottom: 6,
  },
  expDescription: {
    fontSize: 9,
    color: '#3F3F46',
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 14,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#18181B',
    flex: 1,
    paddingRight: 8,
  },
  educationDate: {
    fontSize: 9,
    color: '#71717A',
    flexShrink: 0,
  },
  educationInstitution: {
    fontSize: 10,
    color: '#52525B',
  },
  referencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  referenceCard: {
    width: '47%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 6,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: '3%',
    marginBottom: 10,
  },
  referenceName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#18181B',
    marginBottom: 2,
  },
  referenceRole: {
    fontSize: 9,
    color: '#52525B',
    marginBottom: 4,
  },
  referenceEmail: {
    fontSize: 9,
    fontWeight: 'bold',
  },
})

export function ModernPDF({ content, settings }: ModernPDFProps) {
  const {
    personalInfo,
    experiences,
    education,
    skills,
    languages,
    references,
  } = content

  const accentColor = settings.accentColor || '#1E293B'

  return (
    <View style={styles.pageLayout}>
      {/* SIDEBAR */}
      <View style={[styles.sidebar, { backgroundColor: accentColor }]}>
        {settings.photoUrl && (
          <View style={styles.photoWrapper}>
            <View style={styles.photoCircle}>
              <PDFPhoto
                src={settings.photoUrl}
                style={{ width: 76, height: 76 }}
              />
            </View>
          </View>
        )}

        <Text style={styles.sidebarName}>
          {sanitizeForPDF(personalInfo.fullName)}
        </Text>

        {personalInfo.jobTitle && (
          <Text style={styles.sidebarJobTitle}>
            {sanitizeForPDF(personalInfo.jobTitle)}
          </Text>
        )}

        <View style={styles.sidebarDivider} />

        {/* Contact */}
        {(personalInfo.email || personalInfo.phone || personalInfo.address || personalInfo.linkedin) && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {personalInfo.email && (
              <View style={styles.contactRow}>
                <MailIcon size={10} color="#E5E7EB" />
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.email)}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactRow}>
                <PhoneIcon size={10} color="#E5E7EB" />
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text>
              </View>
            )}
            {personalInfo.address && (
              <View style={styles.contactRow}>
                <MapPinIcon size={10} color="#E5E7EB" />
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.address)}</Text>
              </View>
            )}
            {personalInfo.linkedin && (
              <View style={styles.contactRow}>
                <Globe2Icon size={10} color="#E5E7EB" />
                <Text style={styles.contactText}>LinkedIn</Text>
              </View>
            )}
          </View>
        )}

        {/* Compétences */}
        {skills.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Compétences</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill) => (
                <View key={skill.id} style={styles.skillPill}>
                  <Text style={styles.skillText}>{sanitizeForPDF(skill.name)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Langues */}
        {languages.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Langues</Text>
            {languages.map((lang) => {
              const pct = LANGUAGE_LEVEL_PCT[lang.level] ?? 50
              return (
                <View key={lang.id} style={styles.languageItem}>
                  <View style={styles.languageRow}>
                    <Text style={styles.languageName}>{sanitizeForPDF(lang.name)}</Text>
                    <Text style={styles.languageLevel}>{sanitizeForPDF(lang.level)}</Text>
                  </View>
                  <View style={styles.languageBarBg}>
                    <View style={[styles.languageBarFill, { width: `${pct}%` }]} />
                  </View>
                </View>
              )
            })}
          </View>
        )}
      </View>

      {/* MAIN */}
      <View style={styles.main}>
        {personalInfo.summary && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { color: accentColor }]}>
              A propos de moi
            </Text>
            <Text style={styles.summaryText}>{sanitizeForPDF(personalInfo.summary)}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { color: accentColor }]}>
              Expériences
            </Text>
            {experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={[styles.experienceBullet, { backgroundColor: accentColor }]} />
                <View style={styles.expHeader}>
                  <Text style={styles.expPosition}>{sanitizeForPDF(exp.position)}</Text>
                  <Text style={styles.expDate}>
                    {sanitizeForPDF(exp.startDate)} —{' '}
                    {exp.isCurrent ? 'Présent' : sanitizeForPDF(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.expCompany}>{sanitizeForPDF(exp.company)}</Text>
                {exp.description && (
                  <Text style={styles.expDescription}>{sanitizeForPDF(exp.description)}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { color: accentColor }]}>
              Formation
            </Text>
            {education.map((edu) => (
              <View key={edu.id} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.educationDegree}>{sanitizeForPDF(edu.degree)}</Text>
                  <Text style={styles.educationDate}>
                    {sanitizeForPDF(edu.startDate)} —{' '}
                    {edu.isCurrent ? 'Présent' : sanitizeForPDF(edu.endDate)}
                  </Text>
                </View>
                <Text style={styles.educationInstitution}>{sanitizeForPDF(edu.institution)}</Text>
              </View>
            ))}
          </View>
        )}

        {references.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { color: accentColor }]}>
              Références
            </Text>
            <View style={styles.referencesGrid}>
              {references.map((ref) => (
                <View key={ref.id} style={styles.referenceCard}>
                  <Text style={styles.referenceName}>{sanitizeForPDF(ref.name)}</Text>
                  <Text style={styles.referenceRole}>
                    {sanitizeForPDF(ref.position)}{ref.company ? ` @ ${sanitizeForPDF(ref.company)}` : ''}
                  </Text>
                  {ref.email && (
                    <Text style={[styles.referenceEmail, { color: accentColor }]}>
                      {sanitizeForPDF(ref.email)}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  )
}
