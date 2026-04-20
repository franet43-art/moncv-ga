import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import type { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import {
  MailIcon, PhoneIcon, MapPinIcon, Globe2Icon,
  CalendarIcon, Building2Icon, GraduationCapIcon,
  UserCheckIcon, LaptopIcon, LanguagesIcon
} from './shared/pdf-icons'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#1F2937',
  },
  header: {
    textAlign: 'center',
    position: 'relative',
    paddingBottom: 24,
    borderBottomWidth: 2,
    marginBottom: 32,
  },
  photoContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#F3F4F6',
    overflow: 'hidden',
  },
  headerWithPhoto: {
    paddingRight: 112,
    textAlign: 'left',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    color: '#18181B',
  },
  title: {
    fontSize: 14,
    fontWeight: 'normal',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 9,
    color: '#52525B',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  sectionContent: {
    fontSize: 9,
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  experienceContainer: {
    position: 'relative',
    paddingLeft: 16,
    borderLeftWidth: 2,
    borderLeftColor: '#F3F4F6',
    marginBottom: 20,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  experiencePosition: {
    fontSize: 11,
    fontWeight: 'bold',
    flex: 1,
    color: '#18181B',
  },
  experienceDates: {
    fontSize: 8,
    color: '#71717A',
    fontStyle: 'italic',
  },
  experienceCompany: {
    fontSize: 9,
    fontWeight: 'normal',
    color: '#52525B',
    marginBottom: 6,
  },
  experienceDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    color: '#3F3F46',
  },
  educationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  educationLeft: {
    flex: 1,
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#18181B',
  },
  educationDetails: {
    fontSize: 9,
    color: '#52525B',
  },
  educationDates: {
    fontSize: 8,
    color: '#71717A',
  },
  twoColumns: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  column: {
    width: '50%',
  },
  skillItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  skillName: {
    fontSize: 9,
    flex: 1,
    color: '#3F3F46',
  },
  skillLevel: {
    fontSize: 8,
    color: '#71717A',
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  languageName: {
    fontSize: 9,
    color: '#3F3F46',
  },
  languageLevel: {
    fontSize: 8,
    color: '#71717A',
  },
  referencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  referenceItem: {
    width: '50%',
    paddingRight: 16,
    marginBottom: 16,
  },
  referenceName: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#18181B',
  },
  referencePosition: {
    fontSize: 9,
    color: '#52525B',
    marginBottom: 2,
  },
  referenceCompany: {
    fontSize: 9,
    color: '#52525B',
    marginBottom: 4,
  },
  referenceContact: {
    fontSize: 8,
    color: '#71717A',
  },
});

export const ClassicPDF = ({ content, settings }: { content: CVContent; settings: CVSettings }) => {
  const { personalInfo, experiences, education, skills, languages, references } = content;
  const { accentColor, photoUrl } = settings;
  const hasPhoto = !!photoUrl;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={[
        styles.header,
        hasPhoto ? styles.headerWithPhoto : {},
        { borderBottomColor: accentColor }
      ]}>
        {hasPhoto && (
          <View style={styles.photoContainer}>
            <PDFPhoto src={photoUrl} style={{ width: '100%', height: '100%' }} />
          </View>
        )}
        <Text style={styles.name}>{sanitizeForPDF(personalInfo.fullName)}</Text>
        {personalInfo.jobTitle && (
          <Text style={[styles.title, { color: accentColor }]}>
            {sanitizeForPDF(personalInfo.jobTitle)}
          </Text>
        )}
        <View style={styles.contactRow}>
          {personalInfo.email && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14, marginBottom: 4 }}>
              <MailIcon size={9} color={settings.accentColor} />
              <Text style={{ fontSize: 9, marginLeft: 3 }}>{sanitizeForPDF(personalInfo.email)}</Text>
            </View>
          )}
          {personalInfo.phone && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14, marginBottom: 4 }}>
              <PhoneIcon size={9} color={settings.accentColor} />
              <Text style={{ fontSize: 9, marginLeft: 3 }}>{sanitizeForPDF(personalInfo.phone)}</Text>
            </View>
          )}
          {personalInfo.address && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14, marginBottom: 4 }}>
              <MapPinIcon size={9} color={settings.accentColor} />
              <Text style={{ fontSize: 9, marginLeft: 3 }}>{sanitizeForPDF(personalInfo.address)}</Text>
            </View>
          )}
          {personalInfo.linkedin && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Globe2Icon size={9} color={settings.accentColor} />
              <Text style={{ fontSize: 9, marginLeft: 3 }}>{sanitizeForPDF(personalInfo.linkedin)}</Text>
            </View>
          )}
        </View>
      </View>

      {/* PROFIL */}
      {personalInfo.summary && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>
            PROFIL PROFESSIONNEL
          </Text>
          <Text style={styles.sectionContent}>{sanitizeForPDF(personalInfo.summary)}</Text>
        </View>
      )}

      {/* EXPÉRIENCES */}
      {experiences && experiences.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>
            EXPÉRIENCE PROFESSIONNELLE
          </Text>
          {experiences.map((exp, index) => (
            <View key={index} style={styles.experienceContainer}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 11 }}>{sanitizeForPDF(exp.position)}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CalendarIcon size={8} color="#71717A" />
                  <Text style={{ fontSize: 8, color: '#71717A', marginLeft: 3 }}>
                    {sanitizeForPDF(exp.startDate)} — {exp.isCurrent ? 'Present' : sanitizeForPDF(exp.endDate)}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                <Building2Icon size={9} color="#52525B" />
                <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#52525B', marginLeft: 3 }}>
                  {sanitizeForPDF(exp.company)}
                </Text>
              </View>
              {exp.description && (
                <Text style={styles.experienceDescription}>{sanitizeForPDF(exp.description)}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* FORMATION */}
      {education && education.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>
            FORMATION
          </Text>
          {education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.educationLeft}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                  <GraduationCapIcon size={9} color={settings.accentColor} />
                  <Text style={{ fontWeight: 'bold', fontSize: 10, marginLeft: 3 }}>{sanitizeForPDF(edu.degree)}</Text>
                </View>
                <Text style={styles.educationDetails}>
                  {sanitizeForPDF(edu.institution)}{edu.field ? ` • ${sanitizeForPDF(edu.field)}` : ''}
                </Text>
              </View>
              <Text style={styles.educationDates}>
                {sanitizeForPDF(edu.startDate)} — {edu.isCurrent ? 'Présent' : sanitizeForPDF(edu.endDate)}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* COMPÉTENCES + LANGUES */}
      {((skills && skills.length > 0) || (languages && languages.length > 0)) && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>
            COMPÉTENCES & LANGUES
          </Text>
          <View style={styles.twoColumns}>
            {skills && skills.length > 0 && (
              <View style={styles.column}>
                {skills.map((skill, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <LaptopIcon size={8} color="#71717A" />
                    <Text style={{ fontSize: 9, marginLeft: 3 }}>{sanitizeForPDF(skill.name)}</Text>
                  </View>
                ))}
              </View>
            )}
            {languages && languages.length > 0 && (
              <View style={styles.column}>
                {languages.map((lang, index) => (
                  <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <LanguagesIcon size={8} color="#71717A" />
                      <Text style={{ fontSize: 9, marginLeft: 3 }}>{sanitizeForPDF(lang.name)}</Text>
                    </View>
                    <Text style={{ fontSize: 9, color: '#71717A' }}>{sanitizeForPDF(lang.level)}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      )}

      {/* RÉFÉRENCES */}
      {references && references.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: accentColor, borderBottomColor: accentColor }]}>
            RÉFÉRENCES
          </Text>
          <View style={styles.referencesGrid}>
            {references.map((ref, index) => (
              <View key={index} style={styles.referenceItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                  <UserCheckIcon size={9} color={settings.accentColor} />
                  <Text style={{ fontWeight: 'bold', fontSize: 10, marginLeft: 3 }}>{sanitizeForPDF(ref.name)}</Text>
                </View>
                {ref.position && <Text style={styles.referencePosition}>{sanitizeForPDF(ref.position)}</Text>}
                {ref.company && <Text style={styles.referenceCompany}>{sanitizeForPDF(ref.company)}</Text>}
                {ref.email && <Text style={styles.referenceContact}>{sanitizeForPDF(ref.email)}</Text>}
                {ref.phone && <Text style={styles.referenceContact}>{sanitizeForPDF(ref.phone)}</Text>}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
