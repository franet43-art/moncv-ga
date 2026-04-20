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
    marginBottom: 8,
  },
  photoContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 96,
    height: 96,
    borderRadius: 48,
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
    marginBottom: 6,
    paddingBottom: 6,
  },
  sectionContent: {
    fontSize: 9,
    lineHeight: 1.6,
    textAlign: 'justify',
  },
  experienceContainer: {
    flexDirection: 'row',
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
              <MailIcon size={12} color={settings.accentColor} />
              <View style={{ flex: 1, marginLeft: 3 }}>
                <Text style={{ fontSize: 9 }}>{sanitizeForPDF(personalInfo.email)}</Text>
              </View>
            </View>
          )}
          {personalInfo.phone && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14, marginBottom: 4 }}>
              <PhoneIcon size={12} color={settings.accentColor} />
              <View style={{ flex: 1, marginLeft: 3 }}>
                <Text style={{ fontSize: 9 }}>{sanitizeForPDF(personalInfo.phone)}</Text>
              </View>
            </View>
          )}
          {personalInfo.address && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 14, marginBottom: 4 }}>
              <MapPinIcon size={12} color={settings.accentColor} />
              <View style={{ flex: 1, marginLeft: 3 }}>
                <Text style={{ fontSize: 9 }}>{sanitizeForPDF(personalInfo.address)}</Text>
              </View>
            </View>
          )}
          {personalInfo.linkedin && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <Globe2Icon size={12} color={settings.accentColor} />
              <View style={{ flex: 1, marginLeft: 3 }}>
                <Text style={{ fontSize: 9 }}>{sanitizeForPDF(personalInfo.linkedin)}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={{ height: 2, backgroundColor: accentColor, marginBottom: 24 }} />

      {/* PROFIL */}
      {personalInfo.summary && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: accentColor }]}>PROFIL PROFESSIONNEL</Text>
          <View style={{ height: 1, backgroundColor: accentColor, marginBottom: 12 }} />
          <Text style={styles.sectionContent}>{sanitizeForPDF(personalInfo.summary)}</Text>
        </View>
      )}

      {/* EXPÉRIENCES */}
      {experiences && experiences.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: accentColor }]}>EXPÉRIENCE PROFESSIONNELLE</Text>
          <View style={{ height: 1, backgroundColor: accentColor, marginBottom: 12 }} />
          {experiences.map((exp, index) => (
            <View key={index} style={{ flexDirection: 'row', marginBottom: 20 }}>
              <View style={{ width: 2, backgroundColor: '#E4E4E7', marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 11 }}>{sanitizeForPDF(exp.position)}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <CalendarIcon size={10} color="#71717A" />
                    <View style={{ flex: 1, marginLeft: 3 }}>
                      <Text style={{ fontSize: 8, color: '#71717A' }}>
                        {sanitizeForPDF(exp.startDate)} — {exp.isCurrent ? 'Present' : sanitizeForPDF(exp.endDate)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <Building2Icon size={10} color="#52525B" />
                  <View style={{ flex: 1, marginLeft: 3 }}>
                    <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#52525B' }}>
                      {sanitizeForPDF(exp.company)}
                    </Text>
                  </View>
                </View>
                {exp.description && (
                  <Text style={styles.experienceDescription}>{sanitizeForPDF(exp.description)}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      )}

      {/* FORMATION */}
      {education && education.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: accentColor }]}>FORMATION</Text>
          <View style={{ height: 1, backgroundColor: accentColor, marginBottom: 12 }} />
          {education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.educationLeft}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                  <GraduationCapIcon size={10} color={settings.accentColor} />
                  <View style={{ flex: 1, marginLeft: 3 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{sanitizeForPDF(edu.degree)}</Text>
                  </View>
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
          <Text style={[styles.sectionTitle, { color: accentColor }]}>COMPÉTENCES & LANGUES</Text>
          <View style={{ height: 1, backgroundColor: accentColor, marginBottom: 12 }} />
          <View style={styles.twoColumns}>
            {skills && skills.length > 0 && (
              <View style={styles.column}>
                {skills.map((skill, index) => (
                  <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                    <LaptopIcon size={10} color="#71717A" />
                    <View style={{ flex: 1, marginLeft: 3 }}>
                      <Text style={{ fontSize: 9 }}>{sanitizeForPDF(skill.name)}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
            {languages && languages.length > 0 && (
              <View style={styles.column}>
                {languages.map((lang, index) => (
                  <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <LanguagesIcon size={10} color="#71717A" />
                      <View style={{ flex: 1, marginLeft: 3 }}>
                        <Text style={{ fontSize: 9 }}>{sanitizeForPDF(lang.name)}</Text>
                      </View>
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
          <Text style={[styles.sectionTitle, { color: accentColor }]}>RÉFÉRENCES</Text>
          <View style={{ height: 1, backgroundColor: accentColor, marginBottom: 12 }} />
          <View style={styles.referencesGrid}>
            {references.map((ref, index) => (
              <View key={index} style={styles.referenceItem}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                  <UserCheckIcon size={10} color={settings.accentColor} />
                  <View style={{ flex: 1, marginLeft: 3 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>{sanitizeForPDF(ref.name)}</Text>
                  </View>
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
