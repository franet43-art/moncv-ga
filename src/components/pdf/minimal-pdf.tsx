import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import {
  MailIcon, PhoneIcon, MapPinIcon, GlobeIcon,
  CalendarIcon, GraduationCapIcon, LaptopIcon, LanguagesIcon
} from '@/lib/pdf/pdf-icons'
import { getTokens } from '@/lib/cv-design-tokens'

const getStyles = (tokens: any, accentColor: string) => StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: tokens.mainPadding,
    paddingVertical: tokens.mainPadding,
    color: tokens.textPrimary,
  },
  header: {
    alignItems: 'center',
    marginBottom: tokens.sectionGap,
  },
  photoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 16,
  },
  name: {
    fontSize: tokens.nameSize * 1.3,
    fontWeight: 'normal',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: tokens.jobTitleSize,
    fontWeight: 'normal',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: tokens.textMuted,
    marginBottom: 16,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    width: 80,
    backgroundColor: tokens.borderColor,
    marginBottom: 16,
  },
  summary: {
    fontSize: tokens.bodySize,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: tokens.textSecondary,
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: tokens.sectionGap,
  },
  sectionTitle: {
    fontSize: tokens.sectionTitleSize - 2,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: tokens.textMuted,
    borderBottomWidth: 1,
    borderBottomColor: tokens.borderColor,
    paddingBottom: 8,
    marginBottom: 16,
  },
  expRow: {
    flexDirection: 'row',
    marginBottom: tokens.entryGap,
  },
  expDates: {
    width: '33%',
    paddingRight: 16,
  },
  expDatesText: {
    fontSize: tokens.bodySize - 2,
    fontWeight: 'bold',
    color: tokens.textMuted,
    textAlign: 'right',
  },
  expContent: {
    width: '67%',
  },
  expPosition: {
    fontSize: tokens.bodySize + 2,
    fontWeight: 'bold',
    color: tokens.textPrimary,
    marginBottom: 2,
  },
  expCompany: {
    fontSize: tokens.bodySize - 1,
    fontWeight: 'normal',
    color: tokens.textMuted,
    marginBottom: 4,
  },
  expDescription: {
    fontSize: tokens.bodySize - 1,
    fontWeight: 'normal',
    color: tokens.textSecondary,
    lineHeight: 1.5,
  },
  eduGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eduItem: {
    width: '50%',
    paddingRight: 24,
    marginBottom: tokens.entryGap,
  },
  eduDate: {
    fontSize: tokens.bodySize - 2,
    fontWeight: 'bold',
    color: tokens.textMuted,
    marginBottom: 2,
  },
  eduDegree: {
    fontSize: tokens.bodySize,
    fontWeight: 'bold',
    color: tokens.textPrimary,
    marginBottom: 2,
  },
  eduInstitution: {
    fontSize: tokens.bodySize - 2,
    fontWeight: 'normal',
    color: tokens.textSecondary,
  },
  twoCol: {
    flexDirection: 'row',
    marginBottom: tokens.sectionGap,
  },
  col: {
    width: '50%',
    paddingRight: 24,
  },
  skillText: {
    fontSize: tokens.bodySize - 1,
    fontWeight: 'normal',
    color: tokens.textSecondary,
    marginBottom: 4,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  langName: {
    fontSize: tokens.bodySize - 1,
    fontWeight: 'normal',
    color: tokens.textSecondary,
  },
  langLevel: {
    fontSize: tokens.bodySize - 1,
    fontWeight: 'normal',
    color: tokens.textMuted,
  },
  refGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  refItem: {
    width: '50%',
    paddingRight: 24,
    marginBottom: 14,
  },
  refName: {
    fontSize: tokens.bodySize,
    fontWeight: 'bold',
    color: tokens.textPrimary,
    marginBottom: 2,
  },
  refDetail: {
    fontSize: tokens.bodySize - 1,
    fontWeight: 'normal',
    color: tokens.textSecondary,
  },
  refEmail: {
    fontSize: tokens.bodySize - 2,
    fontWeight: 'normal',
    color: tokens.textMuted,
  },
});

export const MinimalPDF = ({ content, settings }: { content: CVContent; settings: CVSettings }) => {
  const { personalInfo, experiences, education, skills, languages, references } = content;
  const { accentColor, photoUrl } = settings;
  const tokens = getTokens(settings.fontSize as any);
  const styles = getStyles(tokens, accentColor);

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {photoUrl && (
          <View style={styles.photoWrapper}>
            <PDFPhoto src={photoUrl} style={{ width: 64, height: 64 }} />
          </View>
        )}
        <Text style={[styles.name, { color: accentColor }]}>{sanitizeForPDF(personalInfo.fullName)}</Text>
        {personalInfo.jobTitle && (
          <Text style={styles.jobTitle}>{sanitizeForPDF(personalInfo.jobTitle)}</Text>
        )}
        <View style={styles.separator} />
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
          {personalInfo.email && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 3 }}>
              <MailIcon size={10} color={tokens.textMuted} />
              <View style={{ flex: 1, marginLeft: 3 }}>
                <Text style={{ fontSize: 8, color: tokens.textMuted }}>{sanitizeForPDF(personalInfo.email)}</Text>
              </View>
            </View>
          )}
          {personalInfo.phone && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 3 }}>
              <PhoneIcon size={10} color={tokens.textMuted} />
              <View style={{ flex: 1, marginLeft: 3 }}>
                <Text style={{ fontSize: 8, color: tokens.textMuted }}>{sanitizeForPDF(personalInfo.phone)}</Text>
              </View>
            </View>
          )}
          {personalInfo.address && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16, marginBottom: 3 }}>
              <MapPinIcon size={10} color={tokens.textMuted} />
              <View style={{ flex: 1, marginLeft: 3 }}>
                <Text style={{ fontSize: 8, color: tokens.textMuted }}>{sanitizeForPDF(personalInfo.address)}</Text>
              </View>
            </View>
          )}
          {personalInfo.linkedin && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
              <GlobeIcon size={10} color={tokens.textMuted} />
              <View style={{ flex: 1, marginLeft: 3 }}>
                <Text style={{ fontSize: 8, color: tokens.textMuted }}>{sanitizeForPDF(personalInfo.linkedin)}</Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* SUMMARY */}
      {personalInfo.summary && (
        <Text style={styles.summary}>"{sanitizeForPDF(personalInfo.summary)}"</Text>
      )}

      {/* EXPÉRIENCES */}
      {experiences && experiences.length > 0 && (
        <View style={{ marginBottom: tokens.sectionGap }}>
          <Text style={styles.sectionTitle}>EXPÉRIENCE</Text>
          {experiences.map((exp, i) => (
            <View key={i} style={styles.expRow}>
              <View style={styles.expDates}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <CalendarIcon size={10} color={tokens.textMuted} />
                  <View style={{ flex: 1, marginLeft: 2 }}>
                    <Text style={styles.expDatesText}>
                      {sanitizeForPDF(exp.startDate)} — {exp.isCurrent ? 'Present' : sanitizeForPDF(exp.endDate)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.expContent}>
                <Text style={styles.expPosition}>{sanitizeForPDF(exp.position)}</Text>
                <Text style={styles.expCompany}>{sanitizeForPDF(exp.company)}</Text>
                {exp.description && (
                  <Text style={styles.expDescription}>{sanitizeForPDF(exp.description)}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* FORMATION */}
      {education && education.length > 0 && (
        <View style={{ marginBottom: tokens.sectionGap }}>
          <Text style={styles.sectionTitle}>FORMATION</Text>
          <View style={styles.eduGrid}>
            {education.map((edu, i) => (
              <View key={i} style={styles.eduItem}>
                <Text style={styles.eduDate}>
                  {sanitizeForPDF(edu.startDate)} — {edu.isCurrent ? 'Présent' : sanitizeForPDF(edu.endDate)}
                </Text>
                <Text style={styles.eduDegree}>{sanitizeForPDF(edu.degree)}</Text>
                <Text style={styles.eduInstitution}>{sanitizeForPDF(edu.institution)}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* COMPÉTENCES + LANGUES */}
      {((skills && skills.length > 0) || (languages && languages.length > 0)) && (
        <View style={styles.twoCol}>
          {skills && skills.length > 0 && (
            <View style={styles.col}>
              <Text style={styles.sectionTitle}>COMPÉTENCES</Text>
              {skills.map((s, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <LaptopIcon size={10} color={tokens.textMuted} />
                  <View style={{ flex: 1, marginLeft: 3 }}>
                    <Text style={styles.skillText}>{sanitizeForPDF(s.name)}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          {languages && languages.length > 0 && (
            <View style={styles.col}>
              <Text style={styles.sectionTitle}>LANGUES</Text>
              {languages.map((l, i) => (
                <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <LanguagesIcon size={10} color={tokens.textMuted} />
                    <View style={{ flex: 1, marginLeft: 3 }}>
                      <Text style={styles.langName}>{sanitizeForPDF(l.name)}</Text>
                    </View>
                  </View>
                  <Text style={styles.langLevel}>{sanitizeForPDF(l.level)}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* RÉFÉRENCES */}
      {references && references.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>RÉFÉRENCES</Text>
          <View style={styles.refGrid}>
            {references.map((ref, i) => (
              <View key={i} style={styles.refItem}>
                <Text style={styles.refName}>{sanitizeForPDF(ref.name)}</Text>
                {ref.position && <Text style={styles.refDetail}>{sanitizeForPDF(ref.position)}</Text>}
                {ref.company && <Text style={styles.refDetail}>{sanitizeForPDF(ref.company)}</Text>}
                {ref.email && <Text style={styles.refEmail}>{sanitizeForPDF(ref.email)}</Text>}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
