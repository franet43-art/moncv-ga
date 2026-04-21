import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon } from '@/lib/pdf/pdf-icons'
import { getTokens } from '@/lib/cv-design-tokens'

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

export function ClassicPDF({ content, settings }: ClassicPDFProps) {
  const {
    personalInfo,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
  } = content
  
  const tokens = getTokens(settings.fontSize as any)
  const accentColor = settings?.accentColor || '#2563EB'
  const photoUrl = settings?.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      padding: tokens.mainPadding,
      color: tokens.textPrimary,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingBottom: tokens.entryGap,
      marginBottom: tokens.sectionGap,
      borderBottomWidth: 2,
    },
    headerLeft: {
      flex: 1,
      paddingRight: 16,
    },
    name: {
      fontSize: tokens.nameSize,
      fontWeight: 'bold',
      color: tokens.textPrimary,
      textTransform: 'uppercase',
      marginBottom: 6,
    },
    jobTitle: {
      fontSize: tokens.jobTitleSize,
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
      fontSize: tokens.bodySize - 1,
      color: tokens.textMuted,
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
      marginBottom: tokens.sectionGap,
    },
    sectionTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: tokens.entryGap,
    },
    sectionBar: {
      width: 4,
      height: tokens.sectionTitleSize + 2,
      marginRight: 8,
    },
    sectionTitleText: {
      fontSize: tokens.sectionTitleSize + 2,
      fontWeight: 'bold',
      color: tokens.textPrimary,
      textTransform: 'uppercase',
      letterSpacing: 1.2,
    },
    summaryText: {
      fontSize: tokens.bodySize,
      color: tokens.textSecondary,
      lineHeight: 1.6,
    },
    expItem: {
      marginBottom: tokens.entryGap,
    },
    expHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 2,
    },
    expPosition: {
      fontSize: tokens.bodySize + 1,
      fontWeight: 'bold',
      color: tokens.textPrimary,
      flex: 1,
      paddingRight: 8,
    },
    expDate: {
      fontSize: tokens.bodySize - 1,
      color: tokens.textMuted,
      flexShrink: 0,
    },
    expCompany: {
      fontSize: tokens.bodySize,
      color: tokens.textSecondary,
      marginBottom: 3,
      fontWeight: 'bold',
    },
    expDescription: {
      fontSize: tokens.bodySize - 1,
      color: tokens.textSecondary,
      lineHeight: 1.5,
    },
    eduItem: {
      marginBottom: tokens.entryGap / 1.5,
    },
    eduHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 2,
    },
    eduDegree: {
      fontSize: tokens.bodySize + 1,
      fontWeight: 'bold',
      color: tokens.textPrimary,
      flex: 1,
      paddingRight: 8,
    },
    eduDate: {
      fontSize: tokens.bodySize - 1,
      color: tokens.textMuted,
      flexShrink: 0,
    },
    eduInstitution: {
      fontSize: tokens.bodySize,
      color: tokens.textSecondary,
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
      fontSize: tokens.bodySize,
      color: tokens.textSecondary,
    },
    skillLevelLabel: {
      fontSize: tokens.bodySize - 1,
      color: tokens.textMuted,
    },
    skillBarBg: {
      height: 5,
      backgroundColor: tokens.borderColor,
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
      fontSize: tokens.bodySize,
      color: tokens.textSecondary,
    },
    langLevel: {
      fontSize: tokens.bodySize - 1,
      color: tokens.textMuted,
    },
    refsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    refCard: {
      width: '48%',
      backgroundColor: '#F9FAFB',
      borderWidth: 1,
      borderColor: tokens.borderColor,
      borderRadius: 5,
      padding: 10,
      marginBottom: 8,
    },
    refCardRight: {
      marginLeft: '4%',
    },
    refName: {
      fontSize: tokens.bodySize,
      fontWeight: 'bold',
      color: tokens.textPrimary,
      marginBottom: 2,
    },
    refSub: {
      fontSize: tokens.bodySize - 1,
      color: tokens.textSecondary,
      marginBottom: 3,
    },
    refEmail: {
      fontSize: tokens.bodySize - 1,
      fontWeight: 'bold',
      color: accentColor,
    },
  })

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
                  <MailIcon size={9} color={tokens.textMuted} />
                </View>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.email)}</Text>
              </View>
            )}
            {personalInfo?.phone && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <PhoneIcon size={9} color={tokens.textMuted} />
                </View>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text>
              </View>
            )}
            {personalInfo?.address && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <MapPinIcon size={9} color={tokens.textMuted} />
                </View>
                <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.address)}</Text>
              </View>
            )}
            {personalInfo?.linkedin && (
              <View style={styles.contactItem}>
                <View style={styles.contactIconBox}>
                  <GlobeIcon size={9} color={tokens.textMuted} />
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
          {experiences.map((exp: any, i: number) => (
            <View key={exp.id ?? i} style={styles.expItem}>
              <View style={styles.expHeader}>
                <Text style={styles.expPosition}>{sanitizeForPDF(exp.position)}</Text>
                <Text style={styles.expDate}>
                  {sanitizeForPDF(exp.startDate)}
                  {exp.startDate ? (exp.isCurrent ? ' - Present' : exp.endDate ? ' - ' : '') : ''}
                  {!exp.isCurrent && exp.endDate ? sanitizeForPDF(exp.endDate) : ''}
                </Text>
              </View>
              <Text style={styles.expCompany}>{sanitizeForPDF(exp.company)}</Text>
              <Text style={styles.expDescription}>{sanitizeForPDF(exp.description)}</Text>
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
          {education.map((edu: any, i: number) => (
            <View key={edu.id ?? i} style={styles.eduItem}>
              <View style={styles.eduHeader}>
                <Text style={styles.eduDegree}>{sanitizeForPDF(edu.degree)}</Text>
                <Text style={styles.eduDate}>
                  {sanitizeForPDF(edu.startDate)}
                  {edu.startDate && !edu.isCurrent && edu.endDate ? ' - ' : ''}
                  {edu.isCurrent ? ' - Present' : sanitizeForPDF(edu.endDate)}
                </Text>
              </View>
              <Text style={styles.eduInstitution}>{sanitizeForPDF(edu.institution)}</Text>
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
            {references.map((ref: any, i: number) => (
              <View
                key={ref.id ?? i}
                style={[styles.refCard, i % 2 === 1 ? styles.refCardRight : {}]}
              >
                <Text style={styles.refName}>{sanitizeForPDF(ref.name)}</Text>
                <Text style={styles.refSub}>
                  {sanitizeForPDF(ref.position)}
                  {ref.position && ref.company ? ' @ ' : ''}
                  {sanitizeForPDF(ref.company)}
                </Text>
                <Text style={styles.refEmail}>
                  {sanitizeForPDF(ref.email)}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  )
}
