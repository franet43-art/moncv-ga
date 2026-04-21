import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'

interface ModernPDFProps {
  content: CVContent
  settings: CVSettings
}

const getLangWidth = (level: string): string => {
  const l = (level || '').toLowerCase()
  if (l.includes('natif') || l.includes('bilingue')) return '100%'
  if (l.includes('courant')) return '85%'
  if (l.includes('inter')) return '65%'
  return '45%'
}

const styles = StyleSheet.create({
  pageLayout: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebarBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '35%',
  },
  sidebar: {
    width: '35%',
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 22,
    paddingRight: 22,
  },
  main: {
    width: '65%',
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 32,
    paddingRight: 32,
  },
  photoCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: 18,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  sidebarName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  sidebarJobTitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 22,
  },
  divider: {
    width: '65%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignSelf: 'center',
    marginBottom: 20,
  },
  sidebarBlock: {
    width: '100%',
    marginBottom: 22,
  },
  sidebarSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 10,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  contactDot: {
    width: 5,
    height: 5,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginRight: 8,
    marginTop: 3,
  },
  contactText: {
    fontSize: 9,
    color: '#FFFFFF',
    flex: 1,
  },
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    backgroundColor: 'rgba(0,0,0,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 3,
  },
  skillPillText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  langItem: {
    marginBottom: 12,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  langName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  langLevel: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.75)',
  },
  langBarBg: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 1,
    overflow: 'hidden',
  },
  langBarFill: {
    height: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  mainSection: {
    marginBottom: 26,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionBar: {
    width: 4,
    height: 14,
    marginRight: 9,
  },
  sectionTitleText: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    color: '#18181B',
  },
  summaryText: {
    fontSize: 10,
    color: '#3F3F46',
    lineHeight: 1.6,
  },
  expItem: {
    marginBottom: 18,
    paddingLeft: 14,
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
  },
  expPosition: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#18181B',
    marginBottom: 2,
  },
  expMeta: {
    fontSize: 9,
    color: '#64748B',
    marginBottom: 4,
  },
  expDesc: {
    fontSize: 9,
    color: '#374151',
    lineHeight: 1.5,
  },
  eduItem: {
    marginBottom: 14,
  },
  eduRow: {
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
    color: '#9CA3AF',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  eduInstitution: {
    fontSize: 10,
    color: '#52525B',
  },
  refItem: {
    backgroundColor: '#F9FAFB',
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 4,
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#18181B',
    marginBottom: 2,
  },
  refSub: {
    fontSize: 9,
    color: '#52525B',
    marginBottom: 3,
  },
  refEmail: {
    fontSize: 9,
    fontWeight: 'bold',
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
  const accentColor = settings?.accentColor || '#6B46C1'
  const photoUrl = settings?.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  return (
    <View style={styles.pageLayout}>

      {/* ===== BACKGROUND SIDEBAR — fixed = répété sur chaque page ===== */}
      <View
        fixed
        style={[styles.sidebarBg, { backgroundColor: accentColor }]}
      />

      {/* ===== SIDEBAR — contenu seulement, PAS de backgroundColor ===== */}
      <View style={styles.sidebar}>
        {hasPhoto && (
          <View style={styles.photoCircle}>
            <PDFPhoto src={photoUrl} style={{ width: 84, height: 84 }} />
          </View>
        )}

        {personalInfo?.fullName && (
          <Text style={styles.sidebarName}>{sanitizeForPDF(personalInfo.fullName)}</Text>
        )}
        {personalInfo?.jobTitle && (
          <Text style={styles.sidebarJobTitle}>{sanitizeForPDF(personalInfo.jobTitle)}</Text>
        )}

        <View style={styles.divider} />

        {/* Contact */}
        {(personalInfo?.email || personalInfo?.phone || personalInfo?.address || personalInfo?.linkedin) && (
          <View style={styles.sidebarBlock}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {personalInfo?.email && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.email)}</Text>
              </View>
            )}
            {personalInfo?.phone && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text>
              </View>
            )}
            {personalInfo?.address && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.address)}</Text>
              </View>
            )}
            {personalInfo?.linkedin && (
              <View style={styles.contactRow}>
                <View style={styles.contactDot} />
                <Text style={styles.contactText}>LinkedIn</Text>
              </View>
            )}
          </View>
        )}

        {/* Compétences */}
        {skills.length > 0 && (
          <View style={styles.sidebarBlock}>
            <Text style={styles.sidebarSectionTitle}>Competences</Text>
            <View style={styles.skillsWrap}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {skills.map((skill: any, i: number) => (
                <View key={skill.id ?? i} style={styles.skillPill}>
                  <Text style={styles.skillPillText}>{sanitizeForPDF(skill.name)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Langues */}
        {languages.length > 0 && (
          <View style={styles.sidebarBlock}>
            <Text style={styles.sidebarSectionTitle}>Langues</Text>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {languages.map((lang: any, i: number) => (
              <View key={lang.id ?? i} style={styles.langItem}>
                <View style={styles.langRow}>
                  <Text style={styles.langName}>{sanitizeForPDF(lang.name)}</Text>
                  <Text style={styles.langLevel}>{sanitizeForPDF(lang.level)}</Text>
                </View>
                <View style={styles.langBarBg}>
                  <View style={[styles.langBarFill, { width: getLangWidth(lang.level) }]} />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* ===== CONTENU PRINCIPAL ===== */}
      <View style={styles.main}>

        {/* Profil */}
        {personalInfo?.summary && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
              <Text style={[styles.sectionTitleText, { color: accentColor }]}>Profil</Text>
            </View>
            <Text style={styles.summaryText}>{sanitizeForPDF(personalInfo.summary)}</Text>
          </View>
        )}

        {/* Expériences */}
        {experiences.length > 0 && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
              <Text style={[styles.sectionTitleText, { color: accentColor }]}>Experience</Text>
            </View>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {experiences.map((exp: any, i: number) => (
              <View key={exp.id ?? i} style={styles.expItem}>
                {exp.position && (
                  <Text style={styles.expPosition}>{sanitizeForPDF(exp.position)}</Text>
                )}
                <Text style={styles.expMeta}>
                  {sanitizeForPDF(exp.company)}
                  {(exp.startDate || exp.endDate || exp.isCurrent) ? '  |  ' : ''}
                  {sanitizeForPDF(exp.startDate)}
                  {exp.startDate ? ' - ' : ''}
                  {exp.isCurrent ? 'Present' : sanitizeForPDF(exp.endDate)}
                </Text>
                {exp.description && (
                  <Text style={styles.expDesc}>{sanitizeForPDF(exp.description)}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Formation */}
        {education.length > 0 && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
              <Text style={[styles.sectionTitleText, { color: accentColor }]}>Formation</Text>
            </View>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {education.map((edu: any, i: number) => (
              <View key={edu.id ?? i} style={styles.eduItem}>
                <View style={styles.eduRow}>
                  {edu.degree && (
                    <Text style={styles.eduDegree}>{sanitizeForPDF(edu.degree)}</Text>
                  )}
                  {(edu.startDate || edu.endDate) && (
                    <Text style={styles.eduDate}>
                      {sanitizeForPDF(edu.startDate)}
                      {edu.startDate && !edu.isCurrent && edu.endDate ? ' - ' : ''}
                      {edu.isCurrent ? ' - Present' : sanitizeForPDF(edu.endDate)}
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

        {/* Références */}
        {references.length > 0 && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
              <Text style={[styles.sectionTitleText, { color: accentColor }]}>References</Text>
            </View>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {references.map((ref: any, i: number) => (
              <View key={ref.id ?? i} style={styles.refItem}>
                {ref.name && <Text style={styles.refName}>{sanitizeForPDF(ref.name)}</Text>}
                {(ref.position || ref.company) && (
                  <Text style={styles.refSub}>
                    {sanitizeForPDF(ref.position)}
                    {ref.position && ref.company ? ' - ' : ''}
                    {sanitizeForPDF(ref.company)}
                  </Text>
                )}
                {ref.email && (
                  <Text style={[styles.refEmail, { color: accentColor }]}>
                    {sanitizeForPDF(ref.email)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}

      </View>
    </View>
  )
}
