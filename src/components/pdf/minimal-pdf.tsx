import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { CVContent, CVSettings } from '@/types/cv';
import { PDFPhoto } from './shared/pdf-photo';
import { sanitizeForPDF } from './pdf-document';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 48,
    paddingVertical: 44,
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
    marginBottom: 44,
  },
  photoWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 16,
  },
  name: {
    fontSize: 32,
    fontWeight: 'normal',
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'normal',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#A1A1AA',
    marginBottom: 16,
    textAlign: 'center',
  },
  separator: {
    height: 1,
    width: 80,
    backgroundColor: '#E4E4E7',
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  contactItem: {
    fontSize: 8,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    color: '#71717A',
    marginRight: 20,
  },
  summary: {
    fontSize: 10,
    fontWeight: 'normal',
    fontStyle: 'italic',
    color: '#52525B',
    textAlign: 'center',
    lineHeight: 1.6,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: 'normal',
    textTransform: 'uppercase',
    letterSpacing: 2,
    color: '#D4D4D8',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E7',
    paddingBottom: 8,
    marginBottom: 16,
  },
  expRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  expDates: {
    width: '33%',
    paddingRight: 16,
  },
  expDatesText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#A1A1AA',
    textAlign: 'right',
  },
  expContent: {
    width: '67%',
  },
  expPosition: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#18181B',
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 9,
    fontWeight: 'normal',
    color: '#A1A1AA',
    marginBottom: 4,
  },
  expDescription: {
    fontSize: 9,
    fontWeight: 'normal',
    color: '#3F3F46',
    lineHeight: 1.5,
  },
  eduGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  eduItem: {
    width: '50%',
    paddingRight: 24,
    marginBottom: 16,
  },
  eduDate: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#A1A1AA',
    marginBottom: 2,
  },
  eduDegree: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#18181B',
    marginBottom: 2,
  },
  eduInstitution: {
    fontSize: 8,
    fontWeight: 'normal',
    color: '#71717A',
  },
  twoCol: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  col: {
    width: '50%',
    paddingRight: 24,
  },
  skillText: {
    fontSize: 9,
    fontWeight: 'normal',
    color: '#52525B',
    marginBottom: 4,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  langName: {
    fontSize: 9,
    fontWeight: 'normal',
    color: '#52525B',
  },
  langLevel: {
    fontSize: 9,
    fontWeight: 'normal',
    color: '#71717A',
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
    fontSize: 10,
    fontWeight: 'bold',
    color: '#18181B',
    marginBottom: 2,
  },
  refDetail: {
    fontSize: 9,
    fontWeight: 'normal',
    color: '#52525B',
  },
  refEmail: {
    fontSize: 8,
    fontWeight: 'normal',
    color: '#71717A',
  },
});

export const MinimalPDF = ({ content, settings }: { content: CVContent; settings: CVSettings }) => {
  const { personalInfo, experiences, education, skills, languages, references } = content;
  const { accentColor, photoUrl } = settings;

  const contacts: string[] = [];
  if (personalInfo.email) contacts.push(sanitizeForPDF(personalInfo.email));
  if (personalInfo.phone) contacts.push(sanitizeForPDF(personalInfo.phone));
  if (personalInfo.address) contacts.push(sanitizeForPDF(personalInfo.address));

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
        <View style={styles.contactRow}>
          {contacts.map((item, i) => (
            <Text key={i} style={[styles.contactItem, i === contacts.length - 1 ? { marginRight: 0 } : {}]}>
              {item}
            </Text>
          ))}
        </View>
      </View>

      {/* SUMMARY */}
      {personalInfo.summary && (
        <Text style={styles.summary}>"{sanitizeForPDF(personalInfo.summary)}"</Text>
      )}

      {/* EXPÉRIENCES */}
      {experiences && experiences.length > 0 && (
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.sectionTitle}>EXPÉRIENCE</Text>
          {experiences.map((exp, i) => (
            <View key={i} style={styles.expRow}>
              <View style={styles.expDates}>
                <Text style={styles.expDatesText}>
                  {sanitizeForPDF(exp.startDate)} — {exp.isCurrent ? 'Présent' : sanitizeForPDF(exp.endDate)}
                </Text>
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
        <View style={{ marginBottom: 40 }}>
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
                <Text key={i} style={styles.skillText}>{sanitizeForPDF(s.name)}</Text>
              ))}
            </View>
          )}
          {languages && languages.length > 0 && (
            <View style={styles.col}>
              <Text style={styles.sectionTitle}>LANGUES</Text>
              {languages.map((l, i) => (
                <View key={i} style={styles.langRow}>
                  <Text style={styles.langName}>{sanitizeForPDF(l.name)}</Text>
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
