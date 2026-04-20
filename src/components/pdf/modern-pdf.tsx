import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'

interface ModernPDFProps {
  content: CVContent
  settings: CVSettings
}

// skill.level est un enum string — mapping vers pourcentage
const SKILL_LEVEL_PCT: Record<string, number> = {
  debutant: 20,
  intermediaire: 40,
  avance: 70,
  expert: 100,
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
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 28,
    paddingRight: 28,
  },
  photoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 16,
  },
  sidebarName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  sidebarJobTitle: {
    fontSize: 10,
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 20,
  },
  sidebarDivider: {
    width: '60%',
    height: 1,
    backgroundColor: '#FFFFFF',
    marginBottom: 18,
    opacity: 0.3,
  },
  sidebarSection: {
    width: '100%',
    marginBottom: 18,
  },
  sidebarSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF',
  },
  contactItem: {
    marginBottom: 5,
  },
  contactText: {
    fontSize: 8,
    color: '#E5E7EB',
  },
  skillItem: {
    marginBottom: 8,
  },
  skillName: {
    fontSize: 8,
    color: '#E5E7EB',
    marginBottom: 3,
  },
  // rgba() évite le problème d'opacity cascade sur les enfants
  skillBarBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  skillBarFill: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  langName: {
    fontSize: 8,
    color: '#E5E7EB',
  },
  langLevel: {
    fontSize: 8,
    color: '#D1D5DB',
  },
  mainSection: {
    marginBottom: 22,
  },
  mainSectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#18181B',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 2,
  },
  summaryText: {
    fontSize: 10,
    color: '#3F3F46',
    lineHeight: 1.6,
  },
  experienceItem: {
    marginBottom: 14,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 3,
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
    marginBottom: 4,
  },
  expDescription: {
    fontSize: 9,
    color: '#3F3F46',
    lineHeight: 1.5,
  },
  educationItem: {
    marginBottom: 12,
  },
  eduHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  eduDegree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#18181B',
    flex: 1,
    paddingRight: 8,
  },
  eduDate: {
    fontSize: 9,
    color: '#71717A',
    flexShrink: 0,
  },
  eduInstitution: {
    fontSize: 10,
    color: '#52525B',
  },
  refItem: {
    marginBottom: 10,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#18181B',
    marginBottom: 2,
  },
  refDetail: {
    fontSize: 9,
    color: '#52525B',
    marginBottom: 1,
  },
})

export function ModernPDF({ content, settings }: ModernPDFProps) {
  const {
    personalInfo,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
  } = content

  const accentColor = settings.accentColor || '#1E293B'
  const photoUrl = settings.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  return (
    <View style={styles.pageLayout}>
      {/* ===== SIDEBAR COLORÉE ===== */}
      <View style={[styles.sidebar, { backgroundColor: accentColor }]}>
        {hasPhoto && (
          <View style={styles.photoCircle}>
            <PDFPhoto src={photoUrl!} style={{ width: 80, height: 80 }} />
          </View>
        )}

        {personalInfo.fullName && (
          <Text style={styles.sidebarName}>{sanitizeForPDF(personalInfo.fullName)}</Text>
        )}
        {personalInfo.jobTitle && (
          <Text style={styles.sidebarJobTitle}>{sanitizeForPDF(personalInfo.jobTitle)}</Text>
        )}

        <View style={styles.sidebarDivider} />

        {/* Contact */}
        {(personalInfo.email || personalInfo.phone || personalInfo.address || personalInfo.linkedin) && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.email)}</Text>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text>
              </View>
            )}
            {personalInfo.address && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.address)}</Text>
              </View>
            )}
            {personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.linkedin)}</Text>
              </View>
            )}
          </View>
        )}

        {/* Compétences */}
        {skills.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Compétences</Text>
            {skills.map((skill, i) => (
              <View key={skill.id ?? i} style={styles.skillItem}>
                <Text style={styles.skillName}>{sanitizeForPDF(skill.name)}</Text>
                <View style={styles.skillBarBg}>
                  <View
                    style={[
                      styles.skillBarFill,
                      { width: `${SKILL_LEVEL_PCT[skill.level ?? ''] ?? 40}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Langues */}
        {languages.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>Langues</Text>
            {languages.map((lang, i) => (
              <View key={lang.id ?? i} style={styles.langItem}>
                <Text style={styles.langName}>{sanitizeForPDF(lang.name)}</Text>
                <Text style={styles.langLevel}>{sanitizeForPDF(lang.level)}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* ===== CONTENU PRINCIPAL ===== */}
      <View style={styles.main}>
        {personalInfo.summary && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { borderBottomColor: accentColor }]}>
              Profil
            </Text>
            <Text style={styles.summaryText}>{sanitizeForPDF(personalInfo.summary)}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { borderBottomColor: accentColor }]}>
              Expérience
            </Text>
            {experiences.map((exp, i) => (
              <View key={exp.id ?? i} style={styles.experienceItem}>
                <View style={styles.expHeader}>
                  {exp.position && (
                    <Text style={styles.expPosition}>{sanitizeForPDF(exp.position)}</Text>
                  )}
                  {(exp.startDate || exp.endDate) && (
                    <Text style={styles.expDate}>
                      {sanitizeForPDF(exp.startDate)}
                      {exp.startDate && (exp.endDate || exp.isCurrent) ? ' - ' : ''}
                      {exp.isCurrent ? 'Présent' : sanitizeForPDF(exp.endDate)}
                    </Text>
                  )}
                </View>
                {exp.company && (
                  <Text style={styles.expCompany}>{sanitizeForPDF(exp.company)}</Text>
                )}
                {exp.description && (
                  <Text style={styles.expDescription}>{sanitizeForPDF(exp.description)}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {education.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { borderBottomColor: accentColor }]}>
              Formation
            </Text>
            {education.map((edu, i) => (
              <View key={edu.id ?? i} style={styles.educationItem}>
                <View style={styles.eduHeader}>
                  {edu.degree && (
                    <Text style={styles.eduDegree}>{sanitizeForPDF(edu.degree)}</Text>
                  )}
                  {(edu.startDate || edu.endDate) && (
                    <Text style={styles.eduDate}>
                      {sanitizeForPDF(edu.startDate)}
                      {edu.startDate && (edu.endDate || edu.isCurrent) ? ' - ' : ''}
                      {edu.isCurrent ? 'Présent' : sanitizeForPDF(edu.endDate)}
                    </Text>
                  )}
                </View>
                {edu.institution && (
                  <Text style={styles.eduInstitution}>{sanitizeForPDF(edu.institution)}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {references.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { borderBottomColor: accentColor }]}>
              Références
            </Text>
            {references.map((ref, i) => (
              <View key={ref.id ?? i} style={styles.refItem}>
                {ref.name && (
                  <Text style={styles.refName}>{sanitizeForPDF(ref.name)}</Text>
                )}
                {ref.position && (
                  <Text style={styles.refDetail}>
                    {sanitizeForPDF(ref.position)}
                    {ref.company ? ` — ${sanitizeForPDF(ref.company)}` : ''}
                  </Text>
                )}
                {ref.email && (
                  <Text style={styles.refDetail}>{sanitizeForPDF(ref.email)}</Text>
                )}
                {ref.phone && (
                  <Text style={styles.refDetail}>{sanitizeForPDF(ref.phone)}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}
