import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { MailIcon, PhoneIcon, MapPinIcon, Globe2Icon } from './shared/pdf-icons'

interface ClassicPDFProps {
  content: CVContent
  settings: CVSettings
}

const SKILL_LEVEL_PCT: Record<string, number> = {
  debutant: 20,
  intermediaire: 45,
  avance: 75,
  expert: 100,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingTop: 40,
    paddingBottom: 40,
    paddingLeft: 48,
    paddingRight: 48,
    color: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 20,
    marginBottom: 28,
    borderBottomWidth: 2,
  },
  headerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#09090B',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  jobTitle: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 18,
    marginBottom: 5,
  },
  contactIconBox: {
    width: 13,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactText: {
    fontSize: 9,
    color: '#71717A',
  },
  photoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    flexShrink: 0,
    borderWidth: 3,
  },
  section: {
    marginBottom: 22,
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
    letterSpacing: 1.2,
  },
  summaryText: {
    fontSize: 10,
    color: '#3F3F46',
    lineHeight: 1.6,
  },
  expItem: {
    marginBottom: 14,
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
  twoColumns: {
    flexDirection: 'row',
  },
  colLeft: {
    flex: 1,
    paddingRight: 16,
  },
  colRight: {
    flex: 1,
    paddingLeft: 16,
  },
  skillItem: {
    marginBottom: 9,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  skillName: {
    fontSize: 10,
    color: '#3F3F46',
  },
  skillLevelLabel: {
    fontSize: 9,
    color: '#A1A1AA',
  },
  skillBarBg: {
    height: 5,
    backgroundColor: '#E4E4E7',
    borderRadius: 2,
    overflow: 'hidden',
  },
  skillBarFill: {
    height: 5,
    borderRadius: 2,
  },
  langItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  langName: {
    fontSize: 10,
    color: '#3F3F46',
  },
  langLevel: {
    fontSize: 9,
    color: '#A1A1AA',
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
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

export function ClassicPDF({ content, settings }: ClassicPDFProps) {
  const {
    personalInfo,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
  } = content
  const accentColor = settings?.accentColor || '#2563EB'
  const photoUrl = settings?.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  return (
    <View style={styles.container}>
      {/* ===== HEADER pleine largeur ===== */}
      <View style={[styles.header, { borderBottomColor: accentColor }]}>
        <View style={styles.headerLeft}>
          {personalInfo?.fullName && (
            <Text style={styles.name}>{sanitizeForPDF(personalInfo.fullName)}</Text>
          )}
          {personalInfo?.jobTitle && (
            <Text style={[styles.jobTitle, { color: accentColor }]}>
              {sanitizeForPDF(personalInfo.jobTitle)}
            </Text>
          )}
          <View style={styles.contactRow}>
            {personalInfo?.email && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <MailIcon size={9} color="#71717A" />
                </View>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.email)}</Text>
              </View>
            )}
            {personalInfo?.phone && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <PhoneIcon size={9} color="#71717A" />
                </View>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text>
              </View>
            )}
            {personalInfo?.address && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <MapPinIcon size={9} color="#71717A" />
                </View>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.address)}</Text>
              </View>
            )}
            {personalInfo?.linkedin && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <Globe2Icon size={9} color="#71717A" />
                </View>
                <Text style={styles.contactText}>LinkedIn</Text>
              </View>
            )}
          </View>
        </View>
        {hasPhoto && (
          <View style={[styles.photoContainer, { borderColor: accentColor }]}>
            <PDFPhoto src={photoUrl} style={{ width: 80, height: 80 }} />
          </View>
        )}
      </View>

      {/* ===== PROFIL ===== */}
      {personalInfo?.summary && (
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
            <Text style={styles.sectionTitleText}>Profil professionnel</Text>
          </View>
          <Text style={styles.summaryText}>{sanitizeForPDF(personalInfo.summary)}</Text>
        </View>
      )}

      {/* ===== EXPÉRIENCES ===== */}
      {experiences.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
            <Text style={styles.sectionTitleText}>Experiences professionnelles</Text>
          </View>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {experiences.map((exp: any, i: number) => (
            <View key={exp.id ?? i} style={styles.expItem}>
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

      {/* ===== FORMATION ===== */}
      {education.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
            <Text style={styles.sectionTitleText}>Formation & Diplomes</Text>
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

      {/* ===== COMPÉTENCES + LANGUES — 2 colonnes ===== */}
      {(skills.length > 0 || languages.length > 0) && (
        <View style={styles.section}>
          <View style={styles.twoColumns}>
            {skills.length > 0 && (
              <View style={styles.colLeft}>
                <View style={styles.sectionTitleRow}>
                  <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
                  <Text style={styles.sectionTitleText}>Competences</Text>
                </View>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {skills.map((skill: any, i: number) => (
                  <View key={skill.id ?? i} style={styles.skillItem}>
                    <View style={styles.skillHeader}>
                      <Text style={styles.skillName}>{sanitizeForPDF(skill.name)}</Text>
                      <Text style={styles.skillLevelLabel}>
                        {sanitizeForPDF(skill.level)}
                      </Text>
                    </View>
                    <View style={styles.skillBarBg}>
                      <View
                        style={[
                          styles.skillBarFill,
                          {
                            width: `${SKILL_LEVEL_PCT[skill.level] || 50}%`,
                            backgroundColor: accentColor,
                          },
                        ]}
                      />
                    </View>
                  </View>
                ))}
              </View>
            )}
            {languages.length > 0 && (
              <View style={styles.colRight}>
                <View style={styles.sectionTitleRow}>
                  <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
                  <Text style={styles.sectionTitleText}>Langues</Text>
                </View>
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {languages.map((lang: any, i: number) => (
                  <View key={lang.id ?? i} style={styles.langItem}>
                    <Text style={styles.langName}>{sanitizeForPDF(lang.name)}</Text>
                    <Text style={styles.langLevel}>{sanitizeForPDF(lang.level)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      )}

      {/* ===== RÉFÉRENCES ===== */}
      {references.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionTitleRow}>
            <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
            <Text style={styles.sectionTitleText}>References</Text>
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
  )
}
