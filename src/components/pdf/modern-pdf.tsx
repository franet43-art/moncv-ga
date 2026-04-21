import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { MailIcon, PhoneIcon, MapPinIcon, Globe2Icon } from './shared/pdf-icons'

interface ModernPDFProps {
  content: CVContent
  settings: CVSettings
}

const LANG_LEVEL_PCT: Record<string, number> = {
  basique: 25,
  intermediaire: 55,
  courant: 80,
  bilingue: 100,
  natif: 100,
}

const styles = StyleSheet.create({
  pageLayout: {
    flexDirection: 'row',
    flex: 1,
    color: '#000000',
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
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 22,
    paddingRight: 22,
    alignItems: 'center',
  },
  main: {
    width: '65%',
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 36,
    paddingRight: 36,
    color: '#000000',
  },
  photoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
    marginBottom: 16,
  },
  sidebarName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  sidebarJobTitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  divider: {
    width: '65%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignSelf: 'center',
    marginBottom: 18,
  },
  sidebarBlock: {
    width: '100%',
    marginBottom: 20,
  },
  sidebarSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 9,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactIconBox: {
    width: 14,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 11,
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
    marginBottom: 24,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionBar: {
    width: 4,
    height: 14,
    marginRight: 8,
  },
  sectionTitleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#09090B',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  summaryText: {
    fontSize: 10,
    color: '#3F3F46',
    lineHeight: 1.6,
  },
  expItem: {
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
    paddingLeft: 12,
    marginBottom: 16,
  },
  expBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 5,
    marginLeft: -17,
  },
  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  expPosition: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#09090B',
    flex: 1,
    paddingRight: 8,
  },
  expDate: {
    fontSize: 9,
    color: '#A1A1AA',
    flexShrink: 0,
  },
  expCompany: {
    fontSize: 10,
    color: '#52525B',
    marginBottom: 3,
  },
  expDescription: {
    fontSize: 9,
    color: '#52525B',
    lineHeight: 1.5,
  },
  eduItem: {
    marginBottom: 13,
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
    color: '#09090B',
    flex: 1,
    paddingRight: 8,
  },
  eduDate: {
    fontSize: 9,
    color: '#A1A1AA',
    flexShrink: 0,
  },
  eduInstitution: {
    fontSize: 10,
    color: '#52525B',
  },
  refsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    borderRadius: 5,
    paddingTop: 11,
    paddingBottom: 11,
    paddingLeft: 11,
    paddingRight: 11,
    marginBottom: 8,
  },
  refCardRight: {
    marginLeft: '4%',
  },
  refName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#09090B',
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
  const accentColor = settings?.accentColor || '#6C63FF'
  const photoUrl = settings?.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  return (
    <View style={styles.pageLayout}>

      {/* ===== FOND SIDEBAR — fixed = répété sur chaque page ===== */}
      <View
        fixed
        style={[styles.sidebarBg, { backgroundColor: accentColor }]}
      />

      {/* ===== SIDEBAR — contenu, PAS de backgroundColor ===== */}
      <View style={styles.sidebar}>
        {hasPhoto && (
          <View style={styles.photoCircle}>
            <PDFPhoto src={photoUrl} style={{ width: 80, height: 80 }} />
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
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <MailIcon size={9} color="rgba(255,255,255,0.7)" />
                </View>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.email)}</Text>
              </View>
            )}
            {personalInfo?.phone && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <PhoneIcon size={9} color="rgba(255,255,255,0.7)" />
                </View>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text>
              </View>
            )}
            {personalInfo?.address && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <MapPinIcon size={9} color="rgba(255,255,255,0.7)" />
                </View>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.address)}</Text>
              </View>
            )}
            {personalInfo?.linkedin && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <Globe2Icon size={9} color="rgba(255,255,255,0.7)" />
                </View>
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
                  <View
                    style={[
                      styles.langBarFill,
                      { width: `${LANG_LEVEL_PCT[lang.level] || 50}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* ===== CONTENU PRINCIPAL ===== */}
      <View style={styles.main}>

        {personalInfo?.summary && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
              <Text style={[styles.sectionTitleText, { color: accentColor }]}>
                A propos de moi
              </Text>
            </View>
            <Text style={styles.summaryText}>{sanitizeForPDF(personalInfo.summary)}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
              <Text style={[styles.sectionTitleText, { color: accentColor }]}>
                Experiences
              </Text>
            </View>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {experiences.map((exp: any, i: number) => (
              <View key={exp.id ?? i} style={styles.expItem}>
                <View style={[styles.expBullet, { backgroundColor: accentColor }]} />
                <View style={styles.expHeader}>
                  {exp.position && (
                    <Text style={styles.expPosition}>{sanitizeForPDF(exp.position)}</Text>
                  )}
                  {(exp.startDate || exp.endDate || exp.isCurrent) && (
                    <Text style={styles.expDate}>
                      {sanitizeForPDF(exp.startDate)}
                      {exp.startDate ? (exp.isCurrent ? ' - Present' : exp.endDate ? ' - ' : '') : ''}
                      {!exp.isCurrent && exp.endDate ? sanitizeForPDF(exp.endDate) : ''}
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
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
              <Text style={[styles.sectionTitleText, { color: accentColor }]}>
                Formation
              </Text>
            </View>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {education.map((edu: any, i: number) => (
              <View key={edu.id ?? i} style={styles.eduItem}>
                <View style={styles.eduHeader}>
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

        {references.length > 0 && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
              <Text style={[styles.sectionTitleText, { color: accentColor }]}>
                References
              </Text>
            </View>
            <View style={styles.refsGrid}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {references.map((ref: any, i: number) => (
                <View
                  key={ref.id ?? i}
                  style={[styles.refCard, i % 2 === 1 ? styles.refCardRight : {}]}
                >
                  {ref.name && (
                    <Text style={styles.refName}>{sanitizeForPDF(ref.name)}</Text>
                  )}
                  {(ref.position || ref.company) && (
                    <Text style={styles.refSub}>
                      {sanitizeForPDF(ref.position)}
                      {ref.position && ref.company ? ' @ ' : ''}
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
          </View>
        )}

      </View>
    </View>
  )
}
