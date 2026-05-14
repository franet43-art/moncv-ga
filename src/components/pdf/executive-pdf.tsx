import React from 'react'
import { View, Text, StyleSheet } from '@react-pdf/renderer'
import { CVContent, CVSettings } from '@/types/cv'
import { PDFPhoto } from './shared/pdf-photo'
import { sanitizeForPDF } from './pdf-document'
import { MailIcon, PhoneIcon, MapPinIcon, GlobeIcon } from '@/lib/pdf/pdf-icons'
import { getTokens } from '@/lib/cv-design-tokens'

interface ExecutivePDFProps { content: CVContent; settings: CVSettings }

const SKILL_LEVEL_PCT: Record<string, number> = { debutant: 25, intermediaire: 50, avance: 75, expert: 100 }

export function ExecutivePDF({ content, settings }: ExecutivePDFProps) {
  const { personalInfo, experiences = [], education = [], skills = [], languages = [], references = [], certifications = [], accomplishments = [] } = content
  const tokens = getTokens(settings.fontSize as any)
  const accent = settings?.accentColor || '#2563EB'
  const photoUrl = settings?.photoUrl
  const hasPhoto = !!(photoUrl && String(photoUrl).trim())

  const s = StyleSheet.create({
    page: { flexDirection: 'column', backgroundColor: '#ffffff', color: '#18181b' },
    topBand: { height: 6, backgroundColor: accent },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', padding: tokens.mainPadding, paddingBottom: tokens.entryGap, borderBottomWidth: 1, borderBottomColor: '#e4e4e7' },
    headerLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, flex: 1 },
    photo: { width: 64, height: 64, borderRadius: 6, borderWidth: 2, borderColor: accent, overflow: 'hidden', flexShrink: 0 },
    name: { fontSize: tokens.nameSize + 2, fontWeight: 'bold', color: '#09090b', textTransform: 'uppercase', marginBottom: 3 },
    jobTitle: { fontSize: tokens.jobTitleSize - 1, fontWeight: 'bold', color: accent, textTransform: 'uppercase', letterSpacing: 1.5 },
    contactBlock: { flexDirection: 'column', alignItems: 'flex-end', gap: 5 },
    contactItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
    contactText: { fontSize: tokens.bodySize - 1, color: '#52525b' },
    summary: { marginHorizontal: tokens.mainPadding, marginTop: tokens.entryGap / 2, marginBottom: tokens.entryGap, fontSize: tokens.bodySize, color: '#3f3f46', lineHeight: 1.6, borderLeftWidth: 3, borderLeftColor: accent, paddingLeft: 10 },
    body: { flexDirection: 'row', flex: 1 },
    mainCol: { flex: 1, padding: tokens.mainPadding, paddingTop: tokens.entryGap, gap: tokens.sectionGap },
    sideCol: { width: '34%', padding: tokens.sidebarPadding, paddingTop: tokens.entryGap, borderLeftWidth: 1, borderLeftColor: '#f4f4f5', backgroundColor: '#fafafa', gap: tokens.sectionGap },
    sectionTitle: { flexDirection: 'row', alignItems: 'center', marginBottom: tokens.entryGap / 1.5, gap: 6 },
    sectionLine: { flex: 1, height: 1, backgroundColor: '#e4e4e7' },
    sectionTitleText: { fontSize: tokens.sectionTitleSize, fontWeight: 'bold', color: '#18181b', textTransform: 'uppercase', letterSpacing: 1.2 },
    sideTitleText: { fontSize: tokens.sectionTitleSize - 1, fontWeight: 'bold', color: '#52525b', textTransform: 'uppercase', letterSpacing: 1 },
    expItem: { marginBottom: tokens.entryGap },
    expHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 2 },
    expPosition: { fontSize: tokens.bodySize + 2, fontWeight: 'bold', color: '#09090b', flex: 1, paddingRight: 6 },
    expDate: { fontSize: tokens.bodySize - 2, color: '#a1a1aa', flexShrink: 0 },
    expCompany: { fontSize: tokens.bodySize, color: '#71717a', marginBottom: 4, fontWeight: 'bold' },
    expDesc: { fontSize: tokens.bodySize - 1, color: '#52525b', lineHeight: 1.5 },
    sideEntry: { marginBottom: tokens.entryGap / 1.5 },
    sideEntryTitle: { fontSize: tokens.bodySize, fontWeight: 'bold', color: '#18181b', marginBottom: 2 },
    sideEntrySubtitle: { fontSize: tokens.bodySize - 1, color: '#71717a' },
    sideEntryDate: { fontSize: tokens.bodySize - 2, color: '#a1a1aa' },
    skillRow: { marginBottom: 8 },
    skillLabel: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 },
    skillName: { fontSize: tokens.bodySize - 1, color: '#52525b' },
    skillLevel: { fontSize: tokens.bodySize - 3, color: '#a1a1aa' },
    skillBar: { height: 4, backgroundColor: '#e4e4e7', borderRadius: 2, overflow: 'hidden' },
    skillFill: { height: 4, borderRadius: 2, backgroundColor: accent },
    langRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    langName: { fontSize: tokens.bodySize - 1, color: '#52525b', fontWeight: 'bold' },
    langLevel: { fontSize: tokens.bodySize - 2, color: '#a1a1aa' },
    bottomBand: { height: 3, backgroundColor: accent, opacity: 0.4 },
  })

  return (
    <View>
      <View style={s.topBand} />
      {/* Header */}
      <View style={s.header}>
        <View style={s.headerLeft}>
          {hasPhoto && <View style={s.photo}><PDFPhoto src={photoUrl} style={{ width: 64, height: 64 }} /></View>}
          <View>
            {personalInfo?.fullName && <Text style={s.name}>{sanitizeForPDF(personalInfo.fullName)}</Text>}
            {personalInfo?.jobTitle && <Text style={s.jobTitle}>{sanitizeForPDF(personalInfo.jobTitle)}</Text>}
          </View>
        </View>
        <View style={s.contactBlock}>
          {personalInfo?.email && <View style={s.contactItem}><Text style={s.contactText}>{sanitizeForPDF(personalInfo.email)}</Text><MailIcon size={8} color={accent} /></View>}
          {personalInfo?.phone && <View style={s.contactItem}><Text style={s.contactText}>{sanitizeForPDF(personalInfo.phone)}</Text><PhoneIcon size={8} color={accent} /></View>}
          {personalInfo?.address && <View style={s.contactItem}><Text style={s.contactText}>{sanitizeForPDF(personalInfo.address)}</Text><MapPinIcon size={8} color={accent} /></View>}
          {personalInfo?.linkedin && <View style={s.contactItem}><Text style={s.contactText}>LinkedIn</Text><GlobeIcon size={8} color={accent} /></View>}
        </View>
      </View>

      {personalInfo?.summary && <Text style={s.summary}>{sanitizeForPDF(personalInfo.summary)}</Text>}

      {/* Body */}
      <View style={s.body}>
        {/* Main left */}
        <View style={s.mainCol}>
          {experiences.length > 0 && (
            <View>
              <View style={s.sectionTitle}>
                <Text style={s.sectionTitleText}>Experiences professionnelles</Text>
                <View style={s.sectionLine} />
              </View>
              {experiences.map((exp: any, i: number) => (
                <View key={exp.id ?? i} style={s.expItem}>
                  <View style={s.expHeader}>
                    <Text style={s.expPosition}>{sanitizeForPDF(exp.position)}</Text>
                    <Text style={s.expDate}>{sanitizeForPDF(exp.startDate)} - {exp.isCurrent ? 'Présent' : sanitizeForPDF(exp.endDate)}</Text>
                  </View>
                  <Text style={s.expCompany}>{sanitizeForPDF(exp.company)}</Text>
                  <Text style={s.expDesc}>{sanitizeForPDF(exp.description)}</Text>
                </View>
              ))}
            </View>
          )}
          {accomplishments.length > 0 && (
            <View>
              <View style={s.sectionTitle}>
                <Text style={s.sectionTitleText}>Realisations cles</Text>
                <View style={s.sectionLine} />
              </View>
              {accomplishments.map((acc: any, i: number) => (
                <View key={acc.id ?? i} style={{ marginBottom: tokens.entryGap / 1.5 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: tokens.bodySize + 1, fontWeight: 'bold', color: '#18181b' }}>{sanitizeForPDF(acc.title)}</Text>
                    <Text style={{ fontSize: tokens.bodySize - 2, color: '#a1a1aa' }}>{sanitizeForPDF(acc.date)}</Text>
                  </View>
                  {acc.description && <Text style={{ fontSize: tokens.bodySize - 1, color: '#52525b' }}>{sanitizeForPDF(acc.description)}</Text>}
                </View>
              ))}
            </View>
          )}
          {references.length > 0 && (
            <View>
              <View style={s.sectionTitle}>
                <Text style={s.sectionTitleText}>References</Text>
                <View style={s.sectionLine} />
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {references.map((ref: any, i: number) => (
                  <View key={ref.id ?? i} style={{ width: '48%', padding: 8, borderWidth: 1, borderColor: '#e4e4e7', borderRadius: 4 }}>
                    <Text style={{ fontSize: tokens.bodySize, fontWeight: 'bold', color: '#18181b' }}>{sanitizeForPDF(ref.name)}</Text>
                    {ref.position && <Text style={{ fontSize: tokens.bodySize - 1, color: '#71717a' }}>{sanitizeForPDF(ref.position)}</Text>}
                    {ref.email && <Text style={{ fontSize: tokens.bodySize - 2, color: accent }}>{sanitizeForPDF(ref.email)}</Text>}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>

        {/* Right sidebar */}
        <View style={s.sideCol}>
          {education.length > 0 && (
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: tokens.entryGap / 1.5, gap: 4 }}>
                <Text style={s.sideTitleText}>Formation</Text>
              </View>
              {education.map((edu: any, i: number) => (
                <View key={edu.id ?? i} style={s.sideEntry}>
                  <Text style={s.sideEntryTitle}>{sanitizeForPDF(edu.degree)}</Text>
                  <Text style={s.sideEntrySubtitle}>{sanitizeForPDF(edu.institution)}</Text>
                  <Text style={s.sideEntryDate}>{sanitizeForPDF(edu.startDate)} - {edu.isCurrent ? 'Présent' : sanitizeForPDF(edu.endDate)}</Text>
                </View>
              ))}
            </View>
          )}
          {skills.length > 0 && (
            <View>
              <Text style={[s.sideTitleText, { marginBottom: tokens.entryGap / 1.5 }]}>Competences</Text>
              {skills.map((skill: any, i: number) => (
                <View key={skill.id ?? i} style={s.skillRow}>
                  <View style={s.skillLabel}>
                    <Text style={s.skillName}>{sanitizeForPDF(skill.name)}</Text>
                    <Text style={s.skillLevel}>{sanitizeForPDF(skill.level)}</Text>
                  </View>
                  <View style={s.skillBar}>
                    <View style={[s.skillFill, { width: `${SKILL_LEVEL_PCT[skill.level] || 50}%` }]} />
                  </View>
                </View>
              ))}
            </View>
          )}
          {languages.length > 0 && (
            <View>
              <Text style={[s.sideTitleText, { marginBottom: tokens.entryGap / 1.5 }]}>Langues</Text>
              {languages.map((lang: any, i: number) => (
                <View key={lang.id ?? i} style={s.langRow}>
                  <Text style={s.langName}>{sanitizeForPDF(lang.name)}</Text>
                  <Text style={s.langLevel}>{sanitizeForPDF(lang.level)}</Text>
                </View>
              ))}
            </View>
          )}
          {certifications.length > 0 && (
            <View>
              <Text style={[s.sideTitleText, { marginBottom: tokens.entryGap / 1.5 }]}>Certifications</Text>
              {certifications.map((cert: any, i: number) => (
                <View key={cert.id ?? i} style={s.sideEntry}>
                  <Text style={s.sideEntryTitle}>{sanitizeForPDF(cert.name)}</Text>
                  <Text style={s.sideEntrySubtitle}>{sanitizeForPDF(cert.issuer)}</Text>
                  <Text style={s.sideEntryDate}>{sanitizeForPDF(cert.date)}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
      <View style={s.bottomBand} />
    </View>
  )
}
