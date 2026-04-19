import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { CVContent, CVSettings } from '@/types/cv';
import { PDFPhoto } from './shared/pdf-photo';
import { sanitizeForPDF } from './pdf-document';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    minHeight: 1050,
    fontFamily: 'Helvetica',
  },
  sidebar: {
    width: '35%',
    padding: 32,
    flexDirection: 'column',
  },
  photoWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    marginBottom: 24,
  },
  sidebarName: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  sidebarJobTitle: {
    fontSize: 11,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 28,
  },
  sidebarSection: {
    marginBottom: 28,
  },
  sidebarSectionTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    paddingBottom: 6,
    marginBottom: 12,
  },
  contactText: {
    fontSize: 9,
    color: '#FFFFFF',
    marginBottom: 6,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillPill: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  skillPillText: {
    fontSize: 7,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  languageItem: {
    marginBottom: 10,
  },
  languageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  languageName: {
    fontSize: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  languageLevel: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.8)',
  },
  languageBarBg: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 2,
  },
  languageBarFill: {
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  mainContent: {
    width: '65%',
    paddingHorizontal: 32,
    paddingVertical: 36,
    flexDirection: 'column',
  },
  summary: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#3F3F46',
    marginBottom: 32,
  },
  mainSection: {
    marginBottom: 28,
  },
  mainSectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    paddingBottom: 8,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  timelineItem: {
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: '#E4E4E7',
    marginBottom: 20,
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    left: -5,
    top: 4,
    width: 9,
    height: 9,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  timelinePosition: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#18181B',
    flex: 1,
  },
  timelineDates: {
    fontSize: 8,
    color: '#71717A',
  },
  timelineCompany: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#52525B',
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#3F3F46',
  },
  educationItem: {
    marginBottom: 14,
  },
  educationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#18181B',
  },
  educationDates: {
    fontSize: 8,
    color: '#71717A',
  },
  educationInstitution: {
    fontSize: 9,
    color: '#52525B',
  },
  referencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  referenceItem: {
    width: '50%',
    paddingRight: 16,
    marginBottom: 14,
  },
  referenceName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#18181B',
    marginBottom: 2,
  },
  referenceDetails: {
    fontSize: 9,
    color: '#52525B',
  },
  referenceEmail: {
    fontSize: 8,
    color: '#71717A',
  },
});

function langWidth(level: string): string {
  switch (level) {
    case 'natif': case 'bilingue': return '100%';
    case 'courant': return '80%';
    case 'intermediaire': return '60%';
    case 'debutant': return '40%';
    default: return '50%';
  }
}

export const ModernPDF = ({ content, settings }: { content: CVContent; settings: CVSettings }) => {
  const { personalInfo, experiences, education, skills, languages, references } = content;
  const { accentColor, photoUrl } = settings;

  return (
    <View style={styles.container}>
      {/* SIDEBAR */}
      <View style={[styles.sidebar, { backgroundColor: accentColor }]}>
        {photoUrl && (
          <View style={styles.photoWrapper}>
            <PDFPhoto src={photoUrl} style={{ width: 96, height: 96 }} />
          </View>
        )}
        <Text style={styles.sidebarName}>{sanitizeForPDF(personalInfo.fullName)}</Text>
        {personalInfo.jobTitle && (
          <Text style={styles.sidebarJobTitle}>{sanitizeForPDF(personalInfo.jobTitle)}</Text>
        )}

        {/* Contact */}
        {(personalInfo.email || personalInfo.phone || personalInfo.address) && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>CONTACT</Text>
            {personalInfo.email && <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.email)}</Text>}
            {personalInfo.phone && <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text>}
            {personalInfo.address && <Text style={styles.contactText}>{sanitizeForPDF(personalInfo.address)}</Text>}
          </View>
        )}

        {/* Compétences */}
        {skills && skills.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>COMPÉTENCES</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, i) => (
                <View key={i} style={styles.skillPill}>
                  <Text style={styles.skillPillText}>{sanitizeForPDF(skill.name)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Langues */}
        {languages && languages.length > 0 && (
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>LANGUES</Text>
            {languages.map((lang, i) => (
              <View key={i} style={styles.languageItem}>
                <View style={styles.languageHeader}>
                  <Text style={styles.languageName}>{sanitizeForPDF(lang.name)}</Text>
                  <Text style={styles.languageLevel}>{sanitizeForPDF(lang.level)}</Text>
                </View>
                <View style={styles.languageBarBg}>
                  <View style={[styles.languageBarFill, { width: langWidth(lang.level) }]} />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* CONTENU PRINCIPAL */}
      <View style={styles.mainContent}>
        {personalInfo.summary && (
          <Text style={styles.summary}>{sanitizeForPDF(personalInfo.summary)}</Text>
        )}

        {/* Expériences */}
        {experiences && experiences.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>
              EXPÉRIENCE PROFESSIONNELLE
            </Text>
            {experiences.map((exp, i) => (
              <View key={i} style={styles.timelineItem}>
                <View style={[styles.timelineDot, { backgroundColor: accentColor }]} />
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelinePosition}>{sanitizeForPDF(exp.position)}</Text>
                  <Text style={styles.timelineDates}>
                    {sanitizeForPDF(exp.startDate)} — {exp.isCurrent ? 'Présent' : sanitizeForPDF(exp.endDate)}
                  </Text>
                </View>
                <Text style={styles.timelineCompany}>{sanitizeForPDF(exp.company)}</Text>
                {exp.description && (
                  <Text style={styles.timelineDescription}>{sanitizeForPDF(exp.description)}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Formation */}
        {education && education.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>
              FORMATION
            </Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.educationItem}>
                <View style={styles.educationHeader}>
                  <Text style={styles.educationDegree}>{sanitizeForPDF(edu.degree)}</Text>
                  <Text style={styles.educationDates}>
                    {sanitizeForPDF(edu.startDate)} — {edu.isCurrent ? 'Présent' : sanitizeForPDF(edu.endDate)}
                  </Text>
                </View>
                <Text style={styles.educationInstitution}>{sanitizeForPDF(edu.institution)}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Références */}
        {references && references.length > 0 && (
          <View style={styles.mainSection}>
            <Text style={[styles.mainSectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>
              RÉFÉRENCES
            </Text>
            <View style={styles.referencesGrid}>
              {references.map((ref, i) => (
                <View key={i} style={styles.referenceItem}>
                  <Text style={styles.referenceName}>{sanitizeForPDF(ref.name)}</Text>
                  <Text style={styles.referenceDetails}>
                    {sanitizeForPDF(ref.position)}{ref.company ? ` @ ${sanitizeForPDF(ref.company)}` : ''}
                  </Text>
                  {ref.email && <Text style={styles.referenceEmail}>{sanitizeForPDF(ref.email)}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
