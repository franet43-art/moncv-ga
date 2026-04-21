import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon, BuildingIcon, GraduationCapIcon, UserCheckIcon } from '@/lib/pdf/pdf-icons'
import { getTokens } from '@/lib/cv-design-tokens'

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

export function ModernPDF({ content, settings }: ModernPDFProps) {
  const {
    personalInfo,
    experiences = [],
    education = [],
    skills = [],
    languages = [],
    references = [],
  } = content
  
  const tokens = getTokens(settings.fontSize as any)
  const accentColor = settings?.accentColor || '#6C63FF'
  const photoUrl = settings?.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  const styles = StyleSheet.create({
    pageLayout: {
      flexDirection: 'row',
      flex: 1,
      color: tokens.textPrimary,
    },
    sidebarBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      width: tokens.sidebarWidth,
    },
    sidebar: {
      width: tokens.sidebarWidth,
      padding: tokens.sidebarPadding,
      alignItems: 'center',
    },
    main: {
      width: '65%',
      padding: tokens.mainPadding,
      color: tokens.textPrimary,
    },
    photoCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      overflow: 'hidden',
      borderWidth: 3,
      borderColor: 'rgba(255,255,255,0.2)',
      marginBottom: tokens.entryGap,
    },
    sidebarName: {
      fontSize: tokens.nameSize,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    sidebarJobTitle: {
      fontSize: tokens.jobTitleSize,
      color: 'rgba(255,255,255,0.85)',
      textAlign: 'center',
      fontStyle: 'italic',
      marginBottom: tokens.sectionGap,
    },
    divider: {
      width: '65%',
      height: 1,
      backgroundColor: 'rgba(255,255,255,0.25)',
      alignSelf: 'center',
      marginBottom: tokens.sectionGap,
    },
    sidebarBlock: {
      width: '100%',
      marginBottom: tokens.sectionGap,
    },
    sidebarSectionTitle: {
      fontSize: tokens.sectionTitleSize,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      marginBottom: tokens.entryGap / 2,
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
      fontSize: tokens.bodySize,
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
      fontSize: tokens.bodySize - 2,
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
      fontSize: tokens.bodySize - 1,
      fontWeight: 'bold',
      color: '#FFFFFF',
    },
    langLevel: {
      fontSize: tokens.bodySize - 2,
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
      color: accentColor,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
    },
    summaryText: {
      fontSize: tokens.bodySize,
      color: tokens.textSecondary,
      lineHeight: 1.6,
    },
    expItem: {
      borderLeftWidth: 2,
      borderLeftColor: tokens.borderColor,
      paddingLeft: 12,
      marginBottom: tokens.entryGap,
    },
    expBullet: {
      width: 8,
      height: 8,
      borderRadius: 4,
      marginBottom: 5,
      marginLeft: -17,
      backgroundColor: accentColor,
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
      fontWeight: 'bold',
      marginBottom: 3,
    },
    expDescription: {
      fontSize: tokens.bodySize - 1,
      color: tokens.textSecondary,
      lineHeight: 1.5,
    },
    eduItem: {
      marginBottom: tokens.entryGap,
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
      padding: 11,
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
    <View style={styles.pageLayout}>
      {/* ===== FOND SIDEBAR — fixed = répété sur chaque page ===== */}
      <View
        fixed
        style={[styles.sidebarBg, { backgroundColor: accentColor }]}
      />

      {/* ===== SIDEBAR ===== */}
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

        {/* Contact */}
        {(personalInfo?.email || personalInfo?.phone || personalInfo?.address || personalInfo?.linkedin) && (
          <View style={styles.sidebarBlock}>
            <Text style={styles.sidebarSectionTitle}>Contact</Text>
            {personalInfo?.email && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MailIcon size={10} color="white" />
                <Text style={{ marginLeft: 8, fontSize: tokens.bodySize, color: 'white' }}>
                  {sanitizeForPDF(personalInfo.email)}
                </Text>
              </View>
            )}
            {personalInfo?.phone && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <PhoneIcon size={10} color="white" />
                <Text style={{ marginLeft: 8, fontSize: tokens.bodySize, color: 'white' }}>
                  {sanitizeForPDF(personalInfo.phone)}
                </Text>
              </View>
            )}
            {personalInfo?.address && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <MapPinIcon size={10} color="white" />
                <Text style={{ marginLeft: 8, fontSize: tokens.bodySize, color: 'white' }}>
                  {sanitizeForPDF(personalInfo.address)}
                </Text>
              </View>
            )}
            {personalInfo?.linkedin && (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <GlobeIcon size={10} color="white" />
                <Text style={{ marginLeft: 8, fontSize: tokens.bodySize, color: 'white' }}>
                  LinkedIn
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Compétences */}
        {skills.length > 0 && (
          <View style={styles.sidebarBlock}>
            <Text style={styles.sidebarSectionTitle}>Competences</Text>
            <View style={styles.skillsWrap}>
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
              <Text style={styles.sectionTitleText}>A propos de moi</Text>
            </View>
            <Text style={styles.summaryText}>{sanitizeForPDF(personalInfo.summary)}</Text>
          </View>
        )}

        {experiences.length > 0 && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
              <Text style={styles.sectionTitleText}>Experiences</Text>
            </View>
            {experiences.map((exp: any, i: number) => (
              <View key={exp.id ?? i} style={styles.expItem}>
                <View style={styles.expBullet} />
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

        {education.length > 0 && (
          <View style={styles.mainSection}>
            <View style={styles.sectionTitleRow}>
              <View style={[styles.sectionBar, { backgroundColor: accentColor }]} />
              <Text style={styles.sectionTitleText}>Formation</Text>
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

        {references.length > 0 && (
          <View style={styles.mainSection}>
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
    </View>
  )
}
